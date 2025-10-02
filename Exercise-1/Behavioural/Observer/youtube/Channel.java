package youtube;

import java.util.ArrayList;
import java.util.List;

public class Channel implements Subject {
    private final String channelName;
    private final List<Observer> subscribers = new ArrayList<>();

    public Channel(String channelName) {
        this.channelName = channelName;
    }

    @Override
    public void subscribe(Observer observer) {
        subscribers.add(observer);
        System.out.println(((Subscriber)observer).getName() + " subscribed to " + channelName);
    }

    @Override
    public void unsubscribe(Observer observer) {
        subscribers.remove(observer);
        System.out.println(((Subscriber)observer).getName() + " unsubscribed from " + channelName);
    }

    @Override
    public void notifyObservers(String videoTitle) {
        System.out.println("Channel \"" + channelName + "\" uploaded a new video: \"" + videoTitle + "\"");
        for (Observer observer : subscribers) {
            observer.update(videoTitle);
        }
    }

    public void uploadVideo(String title) {
        notifyObservers(title);
    }
}
