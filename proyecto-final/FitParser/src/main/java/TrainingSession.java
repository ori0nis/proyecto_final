import com.garmin.fit.DateTime;
import com.garmin.fit.Sport;

import java.util.List;

public class TrainingSession {
    Sport sport;
    DateTime startTime;
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
    List<LapData> lapDataList;

    public TrainingSession(){}

    // Swim
    public TrainingSession(Sport sport, DateTime startTime, Float totalDistance, Float totalTime, float avgTimePer100m, Short averageHeartRate,
                           Short maxHeartRate, Integer totalCalories, Float maxSpeed, Float avgSpeed,
                           Integer avgWatts, Integer watts20min, List<LapData> lapDataList){

        this.sport = sport;
        this.startTime = startTime;
        this.totalDistance = totalDistance != null ? totalDistance : 0;
        this.totalTime = totalTime;
        this.avgTimePer100m = avgTimePer100m;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.lapDataList = lapDataList;

        // Initializing to avoid null errors:
        this.maxSpeed = maxSpeed != null ? maxSpeed : 0.0f;
        this.avgSpeed = avgSpeed != null ? avgSpeed : 0.0f;
        this.avgWatts = avgWatts != null ? avgWatts : 0;
        this.watts20min = watts20min != null ? watts20min : 0;
    }

    // Bike
    public TrainingSession(Sport sport, DateTime startTime, Float totalDistance, Float totalTime, Float maxSpeed, Float avgSpeed, Integer avgWatts,
                           Integer watts20min, Short averageHeartRate, Short maxHeartRate, Integer totalCalories,
                           List<LapData> lapDataList){

        this.sport = sport;
        this.startTime = startTime;
        this.totalDistance = totalDistance != null ? totalDistance : 0;
        this.totalTime = totalTime;
        this.maxSpeed = maxSpeed;
        this.avgSpeed = avgSpeed;
        this.avgWatts = avgWatts;
        this.watts20min = watts20min;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.lapDataList = lapDataList;
    }

    // Run
    public TrainingSession(Sport sport, DateTime startTime, Float totalDistance, Float totalTime, Short averageHeartRate,
                           Short maxHeartRate, Integer totalCalories, float avgTimePerKm, Float maxSpeed,
                           Float avgSpeed, Integer avgWatts, Integer watts20min, List<LapData> lapDataList){

        this.sport = sport;
        this.startTime = startTime;
        this.totalDistance = totalDistance != null ? totalDistance : 0;
        this.totalTime = totalTime;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.avgTimePerKm = avgTimePerKm;
        this.lapDataList = lapDataList;

        // Initializing to avoid null errors:
        this.maxSpeed = maxSpeed != null ? maxSpeed : 0.0f;
        this.avgSpeed = avgSpeed != null ? avgSpeed : 0.0f;
        this.avgWatts = avgWatts != null? avgWatts : 0;
        this.watts20min = watts20min != null? watts20min : 0;
    }

    // Strength
    public TrainingSession(Sport sport, DateTime startTime, Float totalTime, Short averageHeartRate, Short maxHeartRate, Integer totalCalories,
                           Float totalDistance) {

        this.sport = sport;
        this.startTime = startTime;
        this.totalTime = totalTime;
        this.averageHeartRate = averageHeartRate;
        this.maxHeartRate = maxHeartRate;
        this.totalCalories = totalCalories;
        this.totalDistance = totalDistance != null ? totalDistance : 0;
    }

    public Float getTotalDistance() {
        if(totalDistance != null){
            return totalDistance;
        } else {
            return null;
        }
    }

    public DateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(DateTime startTime) {
        this.startTime = startTime;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
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

    public float getAvgTimePer100m() {
        if(totalTime != null){
            return ((totalTime / 60) / totalDistance) * 100;
        } else {
            return 0;
        }
    }

    public void setAvgTimePer100m(Float avgTimePer100m) {
        this.avgTimePer100m = avgTimePer100m;
    }

    public List<LapData> getLapDataList() {
        return lapDataList;
    }

    public void setLapDataList(List<LapData> lapDataList) {
        this.lapDataList = lapDataList;
    }

    @Override
    public String toString() {
        return "TrainingSession{" +
                "sportType=" + sport +
                "startTime=" + startTime +
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
                ", lapData=" + lapDataList +
                '}';
    }
}
