/*
Question 2: DSA Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.
For example, given:
const nums = [2, 7, 11, 15];
const target = 9;
The function should return [0, 1] because nums[0] + nums[1] = 2 + 7 = 9.
Requirements:
Implement the solution in JavaScript.
The solution should have a time complexity better than O(n^2).
Include proper error handling for edge cases.

*/


function findTargetIndices(nums,target){

    if(!Array.isArray(nums)){
        throw new TypeError('Input must be an array');
    }

    if(typeof target !== "number"){
        throw new TypeError('Target must be a number');
    }

    if(nums.length < 2){
        return [];
    }

    let map = new Map();
    for(let right=0;right<nums.length;right++){
        let value = target - nums[right];
        if(map.has(value)){
            return [map.get(value),right];
        }
        map.set(nums[right],right);
    }
    return [];
}
const nums = [2, 7, 11, 15];
const target = 9;
console.log(findTargetIndices(nums,target));
