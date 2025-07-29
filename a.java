import java.io.*;

public class a {
    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            String s = read.readLine().trim();
            if (s.startsWith("aa") || s.startsWith("bb") || s.startsWith("ba")) {
                out.println(s.substring(0, 1) + " " + s.substring(1, 2) + " " + s.substring(2));
            } else {
                int j = 0;
                for (int i = 2; i < s.length(); i++) {
                    if (s.charAt(i) == 'a') {
                        j = i;
                        break;
                    }
                }
                if (j == 0) {
                    out.println(s.substring(0,1) + " " + s.substring(2,3) + " " + s.substring(3));
                } else {
                    out.println(s.substring(0, s.length() - 3) + " " + s.substring(s.length() - 3, s.length() - 2) + " "
                            + s.substring(s.length() - 2, s.length() - 1));
                }
            }
        }
        out.flush();
        out.close();
        read.close();
    }
}