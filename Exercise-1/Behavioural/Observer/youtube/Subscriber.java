package youtube;

public class Subscriber implements Observer {
    private final String name;

    public Subscriber(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public void update(String videoTitle) {
        System.out.println("Hey " + name + "! New video uploaded: \"" + videoTitle + "\"");
    }
}
