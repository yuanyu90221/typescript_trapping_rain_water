# trapping_rain_water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Examples

```
Example 1:

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
```
## 解析

首先知道 要算某個 i 位置的累積水位比需要知道對那個位置 i 的左邊最大值, 由右邊最大值

水位是需要由兩個最大值夾擊出來的

而累積 i 水位 = min(左邊最大值, 右邊最大值) - 該位置高度 height[i]

water[i] = min(leftMax[i], rightMax[i]) - height[i]

所以作法上可以 先由左往右累加出 到 i 位置來說的 leftMax[i]

再先由右往左累加出 到 i 位置來說的 rightMax[i]

然後算出每個位置 i 的水位 = min(leftMax[i], rightMax[i]) - height[i]

每次直接累加起來水位即可

這樣時間複雜度只要 O(N)， 空間複雜度也是 O(N)

## Two pointer 作法

使用 two pointer 可以讓 空間複雜度降低 到 O(N)

初始化 左界 lp = 0, rp = len(height) - 1, leftMax = 0, rightMax = 0, result =0

同時從左邊及右邊累加 , 由左邊算來的最大值 leftMax, 與由右邊算出來的最大值 rightMax

每次檢查 height[lp] > height[rp] 

如果 height[lp] > height[rp] 檢查當下 height[rp] 是否大於 rightMax 

情況 height[lp] > height[rp]:

如果 height[rp] > rightMax , 更新 rightMax = height[rp], 否則更新 result = rightMax - height[rp] (這邊忽略 leftMax 是因為這邊的更動是由於 height[rp] 小於 height[lp] 所以 rightMax 會小於 leftMax 在當下)

更新 rp = rp - 1

情況 height[lp] <= height[rp]:

如果 height[lp] > leftMax , 更新 leftMax = height[lp], 否則更新 result = leftMax - height[lp] (這邊忽略 rightMax 是因為這邊的更動是由於 height[lp] 小或等於 height[rp] 所以 leftMax 會小於 rightMax 在當下)

更新 lp = rp + 1
## 實作

```typescript
export const trap = (height: number[]): number => {
  let left = 0;
  let right = height.length - 1;
  let left_max = 0;
  let right_max = 0;
  let result = 0;
  while(left < right) {
     if (height[left] < height[right]) {
        if (height[left] > left_max) {
            left_max = height[left];
        } else {
            result += (left_max - height[left]);
        }
        left++;
     }  else {
        if (height[right] > right_max) {
            right_max = height[right];
        } else {
            result += (right_max - height[right]);
        }
        right--;
     } 
  }
  return result; 
};
```