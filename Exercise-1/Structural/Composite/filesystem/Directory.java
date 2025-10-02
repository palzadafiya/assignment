package filesystem;

import java.util.ArrayList;
import java.util.List;

// Composite class
public class Directory implements FileSystemNode {
    private final String name;
    private final List<FileSystemNode> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(FileSystemNode node) {
        children.add(node);
    }

    public void remove(FileSystemNode node) {
        children.remove(node);
    }

    @Override
    public void showDetails(String indent) {
        System.out.println(indent + name + "/");
        for (FileSystemNode child : children) {
            child.showDetails(indent + "   ");
        }
    }

    @Override
    public int getSize() {
        int totalSize = 0;
        for (FileSystemNode child : children) {
            totalSize += child.getSize();
        }
        return totalSize;
    }
}
