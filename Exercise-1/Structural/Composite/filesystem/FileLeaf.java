package filesystem;

// Leaf class
public class FileLeaf implements FileSystemNode {
    private final String name;
    private final int size; // size in KB for simplicity

    public FileLeaf(String name, int size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public void showDetails(String indent) {
        System.out.println(indent + name + " (" + size + " KB)");
    }

    @Override
    public int getSize() {
        return size;
    }
}
