package musicplayer;

public class StoppedState implements State {

    @Override
    public void play(MusicPlayer player) {
        System.out.println("Starting music...");
        player.setState(new PlayingState());
    }

    @Override
    public void pause(MusicPlayer player) {
        System.out.println("Cannot pause. Music is not playing.");
    }

    @Override
    public void stop(MusicPlayer player) {
        System.out.println("Already stopped.");
    }
}
