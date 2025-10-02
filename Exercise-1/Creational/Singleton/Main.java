package Singleton;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Timetable timetable = Timetable.getInstance();
        timetable.viewAvailableSlots();

        Thread f1 = new Thread(new Faculty("Dr. Alice", "10:00 - 11:00"));
        Thread f2 = new Thread(new Faculty("Prof. Bob", "11:00 - 12:00"));
        Thread f3 = new Thread(new Faculty("Dr. Charlie", "10:00 - 11:00"));

        f1.start();
        f2.start();
        f3.start();

        f1.join();
        f2.join();
        f3.join();

        timetable.viewBookings();
        timetable.viewAvailableSlots();
    }
}
