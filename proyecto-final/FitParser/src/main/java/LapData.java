public class LapData {
        private Float lapDistance;
        private Float lapTime;

        public LapData(Float lapDistance, Float lapTime) {
            this.lapDistance = lapDistance;
            this.lapTime = lapTime;
        }

        public Float getLapDistance() {
            return lapDistance;
        }

        public void setLapDistance(Float lapDistance) {
            this.lapDistance = lapDistance;
        }

        public Float getLapTime() {
            return lapTime;
        }

        public void setLapTime(Float lapTime) {
            this.lapTime = lapTime;
        }

        @Override
        public String toString() {
            return "LapData{" +
                    "lapDistance=" + lapDistance + " meters" +
                    ", lapTime=" + FitParser.formatTotalTime(lapTime) + " minutes" +
                    '}';
        }
}

