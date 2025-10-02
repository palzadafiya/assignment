package musicplayer;

public class Main {
    public static void main(String[] args) {
        MusicPlayer player = new MusicPlayer();

        player.play();   
        player.pause();  
        player.play();   
        player.stop();  
        player.pause();
    }
}
