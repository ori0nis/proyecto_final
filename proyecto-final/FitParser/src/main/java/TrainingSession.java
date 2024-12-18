import java.util.List;

public class TrainingSession {
    Float totalDistance;
    Float totalTime;
    Short averageHeartRate;
    Short maxHeartRate;
    Integer totalCalories;
    Float maxSpeed;
    Float avgSpeed;
    Integer avgWatts;
    Integer watts20min;
    float avgTimePer100m;
    float avgTimePerKm;
    List<LapData> lapData;

    // Swim
    public TrainingSession(Float totalDistance, Float totalTime, float avgTimePer100m, Short averageHeartRate,
                           Short maxHeartRate, Integer totalCalories, Float maxSpeed, Float avgSpeed,
                           Integer avgWatts, Integer watts20min, List<LapData> lapData){
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.avgTimePer100m = avgTimePer100m;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.lapData = lapData;

        // Initializing to avoid null errors:
        this.maxSpeed = maxSpeed != null ? maxSpeed : 0.0f;
        this.avgSpeed = avgSpeed != null ? avgSpeed : 0.0f;
        this.avgWatts = avgWatts != null? avgWatts : 0;
        this.watts20min = watts20min != null? watts20min : 0;
    }

    // Bike
    public TrainingSession(Float totalDistance, Float totalTime, Float maxSpeed, Float avgSpeed, Integer avgWatts,
                           Integer watts20min, Short averageHeartRate, Short maxHeartRate, Integer totalCalories,
                           List<LapData> lapData){
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.maxSpeed = maxSpeed;
        this.avgSpeed = avgSpeed;
        this.avgWatts = avgWatts;
        this.watts20min = watts20min;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.lapData = lapData;
    }

    // Run
    public TrainingSession(Float totalDistance, Float totalTime, Short averageHeartRate,
                           Short maxHeartRate, Integer totalCalories, float avgTimePerKm, Float maxSpeed,
                           Float avgSpeed, Integer avgWatts, Integer watts20min, List<LapData> lapData){
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.avgTimePerKm = avgTimePerKm;
        this.lapData = lapData;
        // Initializing to avoid null errors:
        this.maxSpeed = maxSpeed != null ? maxSpeed : 0.0f;
        this.avgSpeed = avgSpeed != null ? avgSpeed : 0.0f;
        this.avgWatts = avgWatts != null? avgWatts : 0;
        this.watts20min = watts20min != null? watts20min : 0;
    }

    // Strength
    public TrainingSession(Float totalTime, Short averageHeartRate, Short maxHeartRate, Integer totalCalories ) {
        this.totalTime = totalTime;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
    }

    public Float getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(Float totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Float getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(Float totalTime) {
        this.totalTime = totalTime;
    }

    public Short getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(Short averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public Short getMaxHeartRate() {
        return maxHeartRate;
    }

    public void setMaxHeartRate(Short maxHeartRate) {
        this.maxHeartRate = maxHeartRate;
    }

    public Float getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(Float maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public Integer getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(Integer totalCalories) {
        this.totalCalories = totalCalories;
    }

    public Float getAvgSpeed() {
        return avgSpeed;
    }

    public void setAvgSpeed(Float avgSpeed) {
        this.avgSpeed = avgSpeed;
    }

    public Integer getAvgWatts() {
        return avgWatts;
    }

    public void setAvgWatts(Integer avgWatts) {
        this.avgWatts = avgWatts;
    }

    public Integer getWatts20min() {
        return watts20min;
    }

    public void setWatts20min(Integer watts20min) {
        this.watts20min = watts20min;
    }

    public Float getAvgTimePerKm() {
        return (totalTime / 60) / (totalDistance / 1000);
    }

    public void setAvgTimePerKm(Float avgTimePerKm) {
        this.avgTimePerKm = avgTimePerKm;
    }

    public Float getAvgTimePer100m() {
        return ((totalTime / 60) / totalDistance) * 100;
    }

    public void setAvgTimePer100m(Float avgTimePer100m) {
        this.avgTimePer100m = avgTimePer100m;
    }

    @Override
    public String toString() {
        return "TrainingSession{" +
                "totalDistance=" + totalDistance + "m" +
                ", totalTime=" + FitParser.formatTotalTime(totalTime) + " minutes" +
                ", averageTimePer100m=" + FitParser.formatTimePer100m(avgTimePer100m) + " min/100m" +
                ", averageHeartRate=" + averageHeartRate +
                ", maxHeartRate=" + maxHeartRate +
                ", totalCalories=" + totalCalories +
                ", averageTimePerKm=" + FitParser.formatTimePerKm(avgTimePerKm) + " min/km" +
                ", maxSpeed=" + (maxSpeed != null ? String.format("%.2f", maxSpeed * 3.6) : "N/A") + " km/h" +
                ", avgSpeed=" + (avgSpeed != null ? String.format("%.2f", avgSpeed * 3.6) : "N/A") + " km/h" +
                ", avgWatts=" + avgWatts +
                ", watts20min=" + watts20min +
                ", lapData=" + lapData +
                '}';
    }
}
