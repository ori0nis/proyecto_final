import com.garmin.fit.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class JSON {
    private static long sessionId = 0;

    public static void main(String[] args) {
        JSONArray trainingSessionsArray = processFitFiles();

        JSONObject trainingData = new JSONObject();
        trainingData.put("training-sessions", trainingSessionsArray);
        System.out.println("JSON Object to write: " + trainingData.toJSONString());

        try (FileWriter file = new FileWriter("C:\\Users\\user\\Documents\\Coding projects\\proyecto-final\\data.json")) {
            file.write(trainingData.toJSONString());
            file.flush();
            System.out.println("JSON file created");
        } catch (IOException e) {
            System.out.println("Error creating the file: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static JSONArray processFitFiles() {
        JSONArray trainingSessionsArray = new JSONArray();

        String filePath = "C:\\RunGap\\RunGap\\export";
        File folder = new File(filePath);
        File[] fitFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".fit"));

        for (File fitfile : fitFiles) {
            try {
                TrainingSession session = FitParser.parseFitFile(fitfile);
                JSONObject sessionJson = createJsonFromTrainingSession(session);
                if (sessionJson != null) {
                    trainingSessionsArray.add(sessionJson);
                }
            } catch (Exception e) {
                System.out.println("Couldn't populate JSON file: " + e.getMessage());
                e.printStackTrace();
            }
        }

        System.out.println(trainingSessionsArray);
        return trainingSessionsArray;
    }

    private static JSONObject createJsonFromTrainingSession(TrainingSession session) {
        if (session == null) {
            return null;
        }

        JSONObject json = new JSONObject();

        json.put("id", sessionId++);

        DateTime startTime = session.getStartTime();
        json.put("startTime", startTime != null ? startTime.toString() : "N/A");

        Sport sport = session.getSport();
        json.put("sportType", sport != null ? sport.toString() : "Unknown");

        json.put("totalDistance", session.getTotalDistance() != null ? session.getTotalDistance() : 0.0f);
        json.put("totalTime", session.getTotalTime() != null ? FitParser.formatTotalTime(session.getTotalTime()) : "00:00:00");
        json.put("avgTimePer100m", session.getAvgTimePer100m() != 0 ? FitParser.formatTimePer100m(session.getAvgTimePer100m()) : "0:00");
        json.put("avgTimePerKm", session.getAvgTimePerKm() != 0 ? FitParser.formatTimePerKm(session.getAvgTimePerKm()) : "0:00");
        json.put("averageHeartRate", session.getAverageHeartRate() != null ? session.getAverageHeartRate() : 0);
        json.put("maxHeartRate", session.getMaxHeartRate() != null ? session.getMaxHeartRate() : 0);
        json.put("totalCalories", session.getTotalCalories() != null ? session.getTotalCalories() : 0);
        json.put("maxSpeed", session.getMaxSpeed() != null ? session.getMaxSpeed() : 0.0f);
        json.put("avgSpeed", session.getAvgSpeed() != null ? session.getAvgSpeed() : 0.0f);
        json.put("avgWatts", session.getAvgWatts() != null ? session.getAvgWatts() : 0);
        json.put("watts20min", session.getWatts20min() != null ? session.getWatts20min() : 0);

        if (session.getLapDataList() != null) {
            JSONArray lapsJsonArray = new JSONArray();
            for (LapData lap : session.getLapDataList()) {
                JSONObject lapJson = new JSONObject();
                lapJson.put("lapDistance", lap.getLapDistance());
                lapJson.put("lapTime", FitParser.formatTotalTime(lap.getLapTime()));  // Format lap time as well
                lapsJsonArray.add(lapJson);
            }
            json.put("laps", lapsJsonArray);
        }
        return json;
    }
}

