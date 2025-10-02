package musicplayer;

public class PlayingState implements State {

    @Override
    public void play(MusicPlayer player) {
        System.out.println("Already playing music!");
    }

    @Override
    public void pause(MusicPlayer player) {
        System.out.println("Music paused.");
        player.setState(new PausedState());
    }

    @Override
    public void stop(MusicPlayer player) {
        System.out.println("Music stopped.");
        player.setState(new StoppedState());
    }
}
