import java.io.*;
import java.util.*;

public class a {
    static int[] dr = { -1, 1, 0, 0 };
    static int[] dc = { 0, 0, 1, -1 };
    static int nodesNextInLayer = 0;

    public static void main(String[] args) throws IOException {
        BufferedReader read = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(System.out);
        int t = Integer.parseInt(read.readLine().trim());
        while (t-- > 0) {
            int n = Integer.parseInt(read.readLine().trim());
            String[] num = read.readLine().split(" ");
            int[] arr = new int[n];
            for (int i = 0; i < n; i++) {
                arr[i] = Integer.parseInt(num[i]);
            }
            int ans = 0;
            int i = 0;
            while( i  < n){
                if(arr[i] == 0){
                    if(i < n-1 && arr[i + 1] == 1) {
                        ans += 2;
                        i++;
                    }else {
                        ans += 1;
                    }
                }else if (arr[i] == 1) {
                    if(i < n-1 && arr[i + 1] == 0) {
                        ans += 2;
                        i++;
                    }else{
                        ans += arr[i];
                    }
                }else {
                    ans+= arr[i];
                }
                i++;
            }
            out.println(ans);
        }
        out.flush();
        out.close();
        read.close();
    }

    public static int solve(char[][] grid, int startRow, int startColumn) {
        int R = grid.length;
        int C = grid[0].length;
        Queue<Integer> rq = new LinkedList<>();
        Queue<Integer> cq = new LinkedList<>();
        int nodesLeftInLayer = 1;
        int moveCount = 0;
        boolean reachEnd = false;
        boolean[][] visited = new boolean[R][C];
        rq.add(startRow);
        cq.add(startColumn);
        visited[startRow][startColumn] = true;
        while (!rq.isEmpty()) {
            int r = rq.poll();
            int c = cq.poll();

            if (grid[r][c] == 'E') {
                reachEnd = true;
                break;
            }
            backtrack(grid, r, c, R, C, rq, cq, visited);
            nodesLeftInLayer--;
            if (nodesLeftInLayer == 0) {
                nodesLeftInLayer = nodesNextInLayer;
                nodesNextInLayer = 0;
                moveCount++;
            }
        }
        return reachEnd ? moveCount : -1;
    }

    public static void backtrack(char[][] grid, int r, int c, int R, int C, Queue<Integer> rq, Queue<Integer> cq,
            boolean[][] visited) {
        for (int i = 0; i < 4; i++) {
            int rr = r + dr[i];
            int cc = c + dc[i];

            if (rr < 0 || cc < 0 || rr >= R || cc >= C)
                continue;
            if (visited[rr][cc] || grid[rr][cc] == '#')
                continue;
            rq.add(rr);
            cq.add(cc);
            visited[rr][cc] = true;
            nodesNextInLayer++;
        }
    }
}