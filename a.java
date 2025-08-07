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
            int k = 0;
            for (int i = 0; i < 3; i++) {
                if (arr[i] == -1) {
                    k++;
                }
            }
            boolean flag = true;
            if (k == 0) {
                int min = Math.min(arr[0], Math.min(arr[1], arr[2]));
                int max = Math.max(arr[0], Math.max(arr[1], arr[2]));
                int mex = findMex(arr[0], arr[1], arr[2]);
                // out.println(mex + " " +max + " " + min);
                if (mex != (max - min)) {
                    out.println("NO");
                    continue;
                }
            } else if (k == 1) {
                int sum = arr[0] + arr[1] + arr[2];
                int max = Math.max(arr[0], Math.max(arr[1], arr[2]));
                // out.println(max + " " + sum);
                if (sum != (max * 2) - 1) {
                    out.println("NO");
                    continue;
                }
            } else if (k == 2) {
                int max = Math.max(arr[0], Math.max(arr[1], arr[2]));
                if (max == 0) {
                    out.println("NO");
                    continue;
                }

            }
            for (int i = 1; i < n - 2; i++) {
                if (arr[i - 1] == -1) {
                    k--;
                }
                if (arr[i + 2] == -1) {
                    k++;
                }
                if (k == 0) {
                    int min = Math.min(arr[i], Math.min(arr[i + 1], arr[i + 2]));
                    int max = Math.max(arr[i], Math.max(arr[i + 1], arr[i + 2]));
                    int mex = findMex(arr[i], arr[i + 1], arr[i + 2]);
                    if (mex != (max - min)) {
                        flag = false;
                        break;
                    }
                } else if (k == 1) {
                    int max = Math.max(arr[i], Math.max(arr[i + 1], arr[i + 2]));
                    int sum = arr[0] + arr[1] + arr[2];
                    if (sum != (max * 2) - 1) {
                        flag = false;
                        break;
                    } else if (k == 2) {
                        int ma = Math.max(arr[i], Math.max(arr[i + 1], arr[i + 2]));
                        if (ma == 0) {
                            out.println("NO");
                            continue;
                        }
                    }
                }
            }
            out.println(flag ? "YES" : "NO");
        }
        out.flush();
        out.close();
        read.close();
    }

    public static int findMex(int a, int b, int c) {
        boolean[] present = new boolean[101];
        present[a] = true;
        present[b] = true;
        present[c] = true;

        for (int i = 0; i < 101; i++) {
            if (!present[i])
                return i;
        }
        return 0;
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