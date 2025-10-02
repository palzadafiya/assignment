package notifier;

public abstract class NotifierDecorator implements Notifier {
    protected final Notifier wrappee; 

    public NotifierDecorator(Notifier notifier) {
        this.wrappee = notifier;
    }

    @Override
    public void send(String message) {
        wrappee.send(message); 
    }
}
