package Singleton;

import java.util.*;

public class Timetable {

    private static volatile Timetable instance;
    private final Set<String> availableSlots;
    private final Map<String, String> bookings;

    private Timetable() {
        this.availableSlots = new LinkedHashSet<>(List.of(
                "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "2:00 - 3:00", "3:00 - 4:00"
        ));
        this.bookings = new HashMap<>();
    }

    public static Timetable getInstance() {
        if (instance == null) {
            synchronized (Timetable.class) {
                if (instance == null) {
                    instance = new Timetable();
                }
            }
        }
        return instance;
    }

    public synchronized boolean bookSlot(String facultyName, String slot) {
        if (!availableSlots.contains(slot)) {
            System.out.println("Slot not available: " + slot);
            return false;
        }
        availableSlots.remove(slot);
        bookings.put(slot, facultyName);
        System.out.println("Slot booked: " + slot + " by " + facultyName);
        return true;
    }

    public synchronized void viewAvailableSlots() {
        System.out.println("Available Slots: " + availableSlots);
    }

    public synchronized void viewBookings() {
        System.out.println("Bookings:");
        for (var entry : bookings.entrySet()) {
            System.out.println("  " + entry.getKey() + " -> " + entry.getValue());
        }
    }
}
