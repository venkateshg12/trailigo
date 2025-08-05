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
            String[] val = read.readLine().split(" ");
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(val[i]);
            }
            int maxLen = 0;
            int currentLen = 0;
            int i = 0;
            while(i < n) {
                if(arr[i] == 0) {
                    currentLen++;
                    maxLen = Math.max(maxLen, currentLen);
                }else {
                    currentLen = 0;
                }
                i++;
            }
            out.println(maxLen);
        }
        out.flush();
        out.close();
        read.close();
    }
}
