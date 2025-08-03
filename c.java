import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class c {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            int n = Integer.parseInt(read.readLine().trim());
            if(n % 2 == 0) {
                if(n == 2) {
                    out.println("1 " + "3 ");
                }else {
                    out.print("1 " + "3 ");
                    for(int i = 2;i<n;i++) {
                        out.print("2 ");
                    }
                    out.println();
                }
            }else {
                for(int i = 0;i < n;i++) {
                    out.print(n + " ");
                }
                out.println();
            }
        }
        out.flush();
        out.close();
        read.close();
    }
}

