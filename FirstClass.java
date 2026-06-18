import java.util.Scanner;

public class FirstClass {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Add of two number is " + a + " + " + b + " = " + (a + b));
        sc.close();
    }
}