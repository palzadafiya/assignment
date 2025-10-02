package youtube;

public class Main {
    public static void main(String[] args) {
        Channel techChannel = new Channel("Tech With AI");

        Subscriber s1 = new Subscriber("Alice");
        Subscriber s2 = new Subscriber("Bob");
        Subscriber s3 = new Subscriber("Charlie");

        techChannel.subscribe(s1);
        techChannel.subscribe(s2);
        techChannel.subscribe(s3);

        techChannel.uploadVideo("Java Tutorial for Beginners");
        techChannel.uploadVideo("React.js Crash Course");

        techChannel.unsubscribe(s2);

        techChannel.uploadVideo("Building a Full-Stack App with Java + React");
    }
}
