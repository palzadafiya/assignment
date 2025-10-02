package filesystem;

public class Main {
    public static void main(String[] args) {
        // Leaf nodes (files)
        FileLeaf file1 = new FileLeaf("resume.pdf", 120);
        FileLeaf file2 = new FileLeaf("photo.jpg", 2500);
        FileLeaf file3 = new FileLeaf("notes.txt", 80);
        FileLeaf file4 = new FileLeaf("data.csv", 500);

        // Composite nodes (directories)
        Directory root = new Directory("root");
        Directory documents = new Directory("Documents");
        Directory images = new Directory("Images");
        Directory backups = new Directory("Backups");

        // Build hierarchy
        documents.add(file1);
        documents.add(file3);

        images.add(file2);

        backups.add(file4);

        root.add(documents);
        root.add(images);
        root.add(backups);

        // Display structure
        System.out.println("File System Structure:\n");
        root.showDetails("  ");

        // Display total size
        System.out.println("Total size of root directory: " + root.getSize() + " KB");
    }
}
