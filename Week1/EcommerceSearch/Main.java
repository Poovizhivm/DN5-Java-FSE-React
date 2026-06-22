import java.util.Arrays;
import java.util.Comparator;

public class Main {

    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Phone", "Electronics"),
                new Product(103, "Watch", "Accessories"),
                new Product(104, "Camera", "Electronics")
        };

        Product linearResult =
                SearchAlgorithms.linearSearch(products, "Camera");

        if (linearResult != null) {
            System.out.println("Linear Search Found: "
                    + linearResult.productName);
        }

        Arrays.sort(products,
                Comparator.comparing(p -> p.productName));

        Product binaryResult =
                SearchAlgorithms.binarySearch(products, "Camera");

        if (binaryResult != null) {
            System.out.println("Binary Search Found: "
                    + binaryResult.productName);
        }
    }
}