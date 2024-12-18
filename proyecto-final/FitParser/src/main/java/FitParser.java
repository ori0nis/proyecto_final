import com.garmin.fit.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FitParser {

    public static void main(String[] args) {
        String filePath = "C:\\Users\\user\\Documents\\Coding projects\\proyecto-final\\RunGap files\\RunGap\\export";
        File folder = new File(filePath);
        File[] fitFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".fit"));

        for (File fitFile : fitFiles) {
            try (FileInputStream inputStream = new FileInputStream(fitFile)) {
                Decode decode = new Decode();
                MesgBroadcaster broadcaster = new MesgBroadcaster(decode);

                broadcaster.addListener((SessionMesgListener) sessionMesg -> {
                    Sport sport = sessionMesg.getSport();
                    System.out.println("Detected Sport: " + sport);

                    DateTime startTime = sessionMesg.getStartTime();
                    System.out.println("Date and time: " + startTime);

                    if (sport == Sport.SWIMMING) {
                        handleSwimming(sessionMesg);
                    } else if (sport == Sport.CYCLING) {
                        handleCycling(sessionMesg);
                    } else if (sport == Sport.RUNNING) {
                        handleRunning(sessionMesg);
                    } else if (sport == Sport.TRAINING) {
                        handleStrengthTraining(sessionMesg);
                    }
                });

                broadcaster.addListener((LapMesgListener) lapMesg -> {
                    Float lapDistance = lapMesg.getTotalDistance();
                    Float lapTime = lapMesg.getTotalTimerTime();

                    System.out.println("  Lap Metrics:  ");
                    System.out.println("  Lap Distance: " + lapDistance + " meters");
                    System.out.println("  Lap Time: " + formatTotalTime(lapTime) + " minutes and seconds");
                });

                decode.read(inputStream, broadcaster);

            } catch (FitRuntimeException | IOException e) {
                System.err.println("Error decoding .fit file: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }

    private static void handleSwimming(SessionMesg sessionMesg) {
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

        List<LapData> lapDataList = collectLapData(sessionMesg);

        TrainingSession trainingSession = new TrainingSession(
                totalDistance, totalTime, avgTimePer100m, averageHeartRate, maxHeartRate, totalCalories, maxSpeed,
                avgSpeed, avgWatts, watts20min, lapDataList);

        System.out.println(trainingSession);
    }

    private static void handleCycling(SessionMesg sessionMesg) {
        Float totalDistance = sessionMesg.getTotalDistance();
        Float totalTime = sessionMesg.getTotalTimerTime();
        Float maxSpeed = sessionMesg.getMaxSpeed();
        Float avgSpeed = sessionMesg.getAvgSpeed();
        Integer avgWatts = sessionMesg.getAvgPower();
        Integer watts20min = sessionMesg.getThresholdPower();
        Short averageHeartRate = sessionMesg.getAvgHeartRate();
        Short maxHeartRate = sessionMesg.getMaxHeartRate();
        Integer totalCalories = sessionMesg.getTotalCalories();

        List<LapData> lapDataList = collectLapData(sessionMesg);

        TrainingSession trainingSession = new TrainingSession(
                totalDistance, totalTime, maxSpeed, avgSpeed, avgWatts, watts20min, averageHeartRate, maxHeartRate,
                totalCalories, lapDataList);

        System.out.println(trainingSession);
    }

    private static void handleRunning(SessionMesg sessionMesg) {
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

        List<LapData> lapDataList = collectLapData(sessionMesg);

        TrainingSession trainingSession = new TrainingSession(
                totalDistance, totalTime, averageHeartRate, maxHeartRate, totalCalories, avgTimePerKm, maxSpeed,
                avgSpeed, avgWatts, watts20min, lapDataList);

        System.out.println(trainingSession);
    }

    private static void handleStrengthTraining(SessionMesg sessionMesg) {
        Float totalTime = sessionMesg.getTotalElapsedTime();
        Short averageHeartRate = sessionMesg.getAvgHeartRate();
        Short maxHeartRate = sessionMesg.getMaxHeartRate();
        Integer totalCalories = sessionMesg.getTotalCalories();

        TrainingSession trainingSession = new TrainingSession(
                totalTime, averageHeartRate, maxHeartRate, totalCalories
        );

        System.out.println(trainingSession);
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

//    private static List<LapData> collectLapData(SessionMesg sessionMesg) {
//        List<LapData> lapDataList = new ArrayList<>();
//
//        // Assuming getTotalTimerTime() is used to calculate the total elapsed time of the activity.
//        float totalTime = sessionMesg.getTotalTimerTime();
//        float avgLapTime = sessionMesg.getAvgLapTime();
//
//        // We need to calculate the number of laps from the total time and average lap time.
//        int numLaps = Math.round(totalTime / avgLapTime); // Calculate number of laps
//
//        float remainingTime = totalTime;
//
//        for (int lapIndex = 0; lapIndex < numLaps; lapIndex++) {
//            float lapTime = avgLapTime; // All laps have the same average time
//            float lapDistance = sessionMesg.getTotalDistance() / numLaps; // Assuming even split distance
//
//            remainingTime -= lapTime; // Update remaining time for the next lap
//            lapDataList.add(new LapData(lapDistance, lapTime));
//        }
//
//        return lapDataList;
//    }
}