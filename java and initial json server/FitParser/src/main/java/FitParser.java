import com.garmin.fit.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FitParser {

    public static void main(String[] args) {
        try {
            File folder = new File("C:\\RunGap\\RunGap\\export");
            File[] fitFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".fit"));
            for (File file : fitFiles) {
                    TrainingSession session = parseFitFile(file);
                    System.out.println(session);
                }
        } catch (Exception e) {
            System.err.println("Error parsing FIT file: " + e.getMessage());
        }
    }

    public static TrainingSession parseFitFile(File fitFile) throws Exception {
        Decode decode = new Decode();
        MesgBroadcaster broadcaster = new MesgBroadcaster(decode);

        List<LapData> lapDataList = new ArrayList<>();
        final TrainingSession[] trainingSession = {null};

        broadcaster.addListener((SessionMesgListener) sessionMesg -> {
            Sport sport = sessionMesg.getSport();
            DateTime startTime = sessionMesg.getStartTime();

            if (sport == Sport.SWIMMING) {
                trainingSession[0] = createSwimmingSession(sessionMesg, lapDataList);
            } else if (sport == Sport.CYCLING) {
                trainingSession[0] = createCyclingSession(sessionMesg, lapDataList);
            } else if (sport == Sport.RUNNING) {
                trainingSession[0] = createRunningSession(sessionMesg, lapDataList);
            } else if (sport == Sport.TRAINING) {
                trainingSession[0] = createStrengthTrainingSession(sessionMesg);
            }
        });

        broadcaster.addListener((LapMesgListener) lapMesg -> {
            Float lapDistance = lapMesg.getTotalDistance();
            Float lapTime = lapMesg.getTotalTimerTime();
            lapDataList.add(new LapData(lapDistance, lapTime));
        });

        try (FileInputStream inputStream = new FileInputStream(fitFile)) {
            decode.read(inputStream, broadcaster);
        } catch (FitRuntimeException | IOException e) {
            throw new Exception("Error decoding .fit file: " + e.getMessage(), e);
        }

        return trainingSession[0];
    }

    private static TrainingSession createSwimmingSession(SessionMesg sessionMesg, List<LapData> lapDataList) {
        Sport sport = sessionMesg.getSport();
        DateTime startTime = sessionMesg.getStartTime();
        Float totalDistance = sessionMesg.getTotalDistance();
        Float totalTime = sessionMesg.getTotalTimerTime();
        float avgTimePer100m = ((totalTime / 60) / totalDistance) * 100;
        Short averageHeartRate = sessionMesg.getAvgHeartRate();
        Short maxHeartRate = sessionMesg.getMaxHeartRate();
        Integer totalCalories = sessionMesg.getTotalCalories();
        Float maxSpeed = sessionMesg.getMaxSpeed() != null ? sessionMesg.getMaxSpeed() : 0.0f;
        Float avgSpeed = sessionMesg.getAvgSpeed() != null ? sessionMesg.getAvgSpeed() : 0.0f;
        Integer avgWatts = sessionMesg.getAvgPower() != null ? sessionMesg.getAvgPower() : 0;
        Integer watts20min = sessionMesg.getThresholdPower() != null ? sessionMesg.getThresholdPower() : 0;

        return new TrainingSession(
                sport, startTime, totalDistance, totalTime, avgTimePer100m, averageHeartRate, maxHeartRate, totalCalories, maxSpeed,
                avgSpeed, avgWatts, watts20min, lapDataList);
    }

    private static TrainingSession createCyclingSession(SessionMesg sessionMesg, List<LapData> lapDataList) {
        Sport sport = sessionMesg.getSport();
        DateTime startTime = sessionMesg.getStartTime();
        Float totalDistance = sessionMesg.getTotalDistance();
        Float totalTime = sessionMesg.getTotalTimerTime();
        Float maxSpeed = sessionMesg.getMaxSpeed();
        Float avgSpeed = sessionMesg.getAvgSpeed();
        Integer avgWatts = sessionMesg.getAvgPower();
        Integer watts20min = sessionMesg.getThresholdPower();
        Short averageHeartRate = sessionMesg.getAvgHeartRate();
        Short maxHeartRate = sessionMesg.getMaxHeartRate();
        Integer totalCalories = sessionMesg.getTotalCalories();

        return new TrainingSession(sport, startTime, totalDistance, totalTime, maxSpeed, avgSpeed, avgWatts, watts20min, averageHeartRate, maxHeartRate, totalCalories, lapDataList);
    }

    private static TrainingSession createRunningSession(SessionMesg sessionMesg, List<LapData> lapDataList) {
        Sport sport = sessionMesg.getSport();
        DateTime startTime = sessionMesg.getStartTime();
        Float totalDistance = sessionMesg.getTotalDistance();
        Float totalTime = sessionMesg.getTotalTimerTime();
        Short averageHeartRate = sessionMesg.getAvgHeartRate();
        Short maxHeartRate = sessionMesg.getMaxHeartRate();
        Integer totalCalories = sessionMesg.getTotalCalories();
        float avgTimePerKm = (totalTime / 60) / (totalDistance / 1000);
        Float maxSpeed = sessionMesg.getMaxSpeed() != null ? sessionMesg.getMaxSpeed() : 0.0f;
        Float avgSpeed = sessionMesg.getAvgSpeed() != null ? sessionMesg.getAvgSpeed() : 0.0f;
        Integer avgWatts = sessionMesg.getAvgPower() != null ? sessionMesg.getAvgPower() : 0;
        Integer watts20min = sessionMesg.getThresholdPower() != null ? sessionMesg.getThresholdPower() : 0;

        return new TrainingSession(
                sport, startTime, totalDistance, totalTime, averageHeartRate, maxHeartRate, totalCalories, avgTimePerKm,
                maxSpeed, avgSpeed, avgWatts, watts20min, lapDataList);
    }

    private static TrainingSession createStrengthTrainingSession(SessionMesg sessionMesg) {
        Sport sport = sessionMesg.getSport();
        DateTime startTime = sessionMesg.getStartTime();
        Float totalTime = sessionMesg.getTotalElapsedTime();
        Short averageHeartRate = sessionMesg.getAvgHeartRate();
        Short maxHeartRate = sessionMesg.getMaxHeartRate();
        Integer totalCalories = sessionMesg.getTotalCalories();
        Float totalDistance = sessionMesg.getTotalDistance();

        return new TrainingSession(sport, startTime, totalTime, averageHeartRate, maxHeartRate, totalCalories, totalDistance);
    }

    public static String formatTotalTime(float totalSeconds) {
        int seconds = Math.round(totalSeconds);
        int hours = seconds / 3600;
        int minutes = (seconds % 3600) / 60;
        int remainingSeconds = seconds % 60;

        return String.format("%02d:%02d:%02d", hours, minutes, remainingSeconds);
    }

    public static String formatTimePerKm(float timeInMinutes) {
        int totalSeconds = Math.round(timeInMinutes * 60);
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;

        return String.format("%02d:%02d", minutes, seconds);
    }

    public static String formatTimePer100m(float avgTimePer100m) {
        int totalMinutes = (int) avgTimePer100m;
        int totalSeconds = Math.round((avgTimePer100m - totalMinutes) * 60);

        return String.format("%d:%02d", totalMinutes, totalSeconds);
    }
}
