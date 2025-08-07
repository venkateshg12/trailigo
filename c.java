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
            String[] val = read.readLine().split(" ");
            int n = Integer.parseInt(val[0]);
            int x = Integer.parseInt(val[1]);
            int y = Integer.parseInt(val[2]);
            if (x > y) {
                int temp = x;
                x = y;
                y = temp;
            }
            if (x != 0 || y == 0 || (n - 1) % y != 0) {
                out.println(-1);
            } else {
                int leader = 2;
                for (int i = 0; i < (n - 1) / y; i++) {
                    for (int j = 0; j < y; j++) {
                        out.print(leader + " ");
                    }
                    leader += y;
                }
                out.println();
            }
        }
        out.flush();
        out.close();
        read.close();
    }
}
