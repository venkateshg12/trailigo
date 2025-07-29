import java.io.*;

public class b {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        // int t = Integer.parseInt(read.readLine().trim());
        // while (t-- > 0) 
        String a = "a";
        String b = "bb";
        String c = "a";
        out.println(a.compareTo(b) + " " + c.compareTo(b));
        // }
        out.flush();
        out.close();
        read.close();
        
    }
}