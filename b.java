import java.io.*;
import java.util.*;

public class b {
    int[] dr = { -1, 1, 0, 0 };
    int[] dc = { 0, 0, 1, -1 };

    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            String[] vala = read.readLine().split(" ");
            String[] valb = read.readLine().split(" ");
            String[] valc = read.readLine().split(" ");
            int[][] a = new int[1][2];
            int[][] b = new int[1][2];
            int[][] c = new int[1][2];
            for (int i = 0; i < 2; i++) {
                a[0][i] = Integer.parseInt(vala[i]);
                b[0][i] = Integer.parseInt(valb[i]);
                c[0][i] = Integer.parseInt(valc[i]);
            }
            long ans = cal(a[0][0], b[0][0], c[0][0]) + cal(a[0][1], b[0][1], c[0][1]);
            ans++;
            out.println(ans);
        }
        out.flush();
        out.close();
        read.close();
    }

    public static long cal(int x, int y, int z) {
        if (z >= x && y >= x) {
            return Math.min(z - x, y - x);
        }
        if (z <= x && y <= x) {
            return Math.min(x - z, x - y);
        }
        return 0;
    }

    /* public static int solve(char[][][] map, boolean[][][] visited, int L, int R, int C, int sl, int sr, int sc) {
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[] { sl, sr, sc, 0 });
        visited[sl][sr][sc] = true;

        while (!q.isEmpty()) {
            int[] node = q.poll();
            int l = node[0], r = node[1], c = node[2], d = node[3];

            if (map[l][r][c] == 'E') {
                return d;
            }

            for (int i = 0; i < 6; i++) {
                int nl = l + dl[i];
                int nr = r + dr[i];
                int nc = c + dc[i];

                if (nl >= 0 && nl < L && nr >= 0 && nr < R && nc >= 0 && nc < C &&
                        !visited[nl][nr][nc] && map[nl][nr][nc] != '#') {
                    visited[nl][nr][nc] = true;
                    q.add(new int[] { nl, nr, nc, d + 1 });
                }
            }
        }
        return -1;
    }*/
} 