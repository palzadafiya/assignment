package Singleton;

public class Faculty implements Runnable {
    private final String name;
    private final String slot;

    public Faculty(String name, String slot) {
        this.name = name;
        this.slot = slot;
    }

    @Override
    public void run() {
        Timetable timetable = Timetable.getInstance();
        timetable.bookSlot(name, slot);
    }
}