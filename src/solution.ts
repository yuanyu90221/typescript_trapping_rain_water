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