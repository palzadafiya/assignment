package musicplayer;

public class PausedState implements State {

    @Override
    public void play(MusicPlayer player) {
        System.out.println("Resuming music...");
        player.setState(new PlayingState());
    }

    @Override
    public void pause(MusicPlayer player) {
        System.out.println("Already paused.");
    }

    @Override
    public void stop(MusicPlayer player) {
        System.out.println("Music stopped from paused state.");
        player.setState(new StoppedState());
    }
}
