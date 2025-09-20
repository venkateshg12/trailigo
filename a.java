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
            // String[] val = read.readLine().split(" ");
            int n = Integer.parseInt(read.readLine().trim());
            int[] arr = new int[2 * n];
            int p = n;
            for (int i = (2 * n) - 1; i >= 0 && p >= 2; i--) {
                if (i == (2 * n) - 1) {
                    arr[i] = p;
                    arr[i - p] = p;
                    p--;
                } else {
                    if (arr[i - p] != 0) {
                        int c = 2;
                        while ((i - (p * c)) >= 0) {
                            if (arr[i - (p * c)] == 0) {
                                arr[i] = p;
                                arr[i - (p * c)] = p;
                                p--;
                                break;
                            } else {
                                c++;
                            }
                        }
                    } else {
                        arr[i] = p;
                        arr[i - p] = p;
                        p--;
                    }
                }
            }
            for (int i = 0; i < 2 * n; i++) {
                if (arr[i] == 0) {
                    out.print("1" + " ");
                } else {
                    out.print(arr[i] + " ");
                }
            }
            out.println();
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