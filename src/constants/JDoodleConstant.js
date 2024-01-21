export const selectingTypeConstant = {
  RANDOM: "random",
  SELECTED: "selected",
};

export const clientData = {
  CLIENTID: "a4c608eba84bcb2033e50faf894a1cea",
  CLIENTSECRET:
    "315406e0bef3c3efaa9b2cad9238335a66241d3dadf54369141351ff42ed5880",
};

export const DropdownMenu = ["java", "cpp", "python3"];
export const ColorDropdownMenu = ["vs-dark", "vs-light"];

export const barColor = (value) => {
  return {
    red: {
      color: "#FFA99D",
      value: "Looks like you've just started your coding adventure!",
    },
    yellow: {
      color: "#FFDC7A",
      value:
        "You're on your way to greatness! A bit more practice, and you'll be cracking codes like a pro!",
    },
    green: {
      color: "#4caf50",
      value: "Impressive! You're coding your way to the top!",
    },
  };
};

export const problems = [
  {
    id: 1,
    problemName: "Palindrome Checker",
    statement:
      "Create a program to check if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequences of characters that reads the same forward and backward (ignoring spaces, punctuation, and case).",
    testCases: [
      { testId: 1, input: "Madam", output: true },
      { testId: 2, input: "Racecar", output: true },
      { testId: 3, input: "Hello", output: false },
      { testId: 4, input: "Rar", output: true },
      { testId: 5, input: "Jack", output: true },
    ],
    inputFormat:
      "The first line contains an integer, n , denoting the size of the array. The second line contains n space-separated integers representing the array's elements.",
    outputFormat: "Print the sum of the array's elements as a single integer.",
    cppAnswer: `#include <iostream>
#include <algorithm>
using namespace std;

bool isPalindrome(string s) {
    s.erase(remove_if(s.begin(), s.end(), [](char c) { return !isalnum(c); }), s.end());
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

int main() {
    string input;
    getline(cin, input);
    cout << boolalpha << isPalindrome(input) << endl;
    return 0;
}
`,
    javaAnswer: `import java.util.Scanner;

public class PalindromeChecker {
    public static boolean isPalindrome(String s) {
        s = s.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        System.out.println(isPalindrome(input));
    }
}
`,
    diffcult: "Medium",
  },
  {
    id: 2,
    statement:
      "Given an array of integers, find the longest subarray where the absolute difference between any two elements is less than or equal to .",
    problemName: "Picking Numbers",
    testCases: [
      { testId: 1, input: "6 4 6 5 3 3 1", output: 3 },
      { testId: 2, input: "4 4 5 3 1", output: 14 },
      { testId: 3, input: "5 4 5 6 2 1", output: 18 },
      { testId: 4, input: "6 1 2 2 3 1 2", output: 5 },
      { testId: 5, input: "6 4 5 3 2 4 1", output: 19 },
    ],
    inputFormat:
      "The first line contains a single integer n, the size of the array a. The second line contains n space-separated integers, each an a[i].",
    outputFormat: "The length of the longest subarray that meets the criterion",
    javaAnswer: `import java.util.*;

      public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        
        // An array of zeroes
        int[] frequency = new int[100 + 1];
        
        // Fill array so that the value at each index corresponds to the number of occurrences of that integer
        for (int i = 0; i < n; i++){
            frequency[in.nextInt()]++;
        }
        in.close();
        
        // Determine which pair of adjacent integers has the highest number of occurrences
        int max = 0;
        for (int i = 1; i <= 100; i++) {
            int count = frequency[i] + frequency[i - 1];
            if (count > max) {
                max = count;
            }
        }
        
        System.out.println(max);
    }
}`,
    cppAnswer: null,
    diffcult: "Hard",
  },
  {
    id: 3,
    problemName: "Sum of Digits",
    statement:
      "Write a program that takes a non-negative integer as input and returns the sum of its digits. For example, given the number 123, the program should return 6 (1 + 2 + 3).",
    testCases: [
      { testId: 1, input: "6 1 2 3 4 5 6", output: 21 },
      { testId: 2, input: "4 4 5 3 2", output: 14 },
      { testId: 3, input: "4 4 5 3 1", output: 14 },
      { testId: 4, input: "5 4 5 6 2 1", output: 18 },
      { testId: 5, input: "7 4 5 3 2 4 1", output: 19 },
    ],
    inputFormat:
      "The first line contains an integer, n , denoting the size of the array. The second line contains n space-separated integers representing the array's elements.",
    outputFormat: "Print the sum of the array's elements as a single integer.",
    cppAnswer: `#include <bits/stdc++.h>
using namespace std;

int main(){
    int number_of_elements;
    cin >> number_of_elements;
    vector <int> array(number_of_elements);
    int sum_of_array = 0;
    
    for(int i = 0; i < number_of_elements; i++){
       cin >> array[i];
       sum_of_array += array[i];
    }
    
    cout << sum_of_array;
    return 0;
}`,
    javaAnswer: `import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int numberOfElements = in.nextInt();
        int array[] = new int[numberOfElements];
        int sumOfArray = 0;
        for(int i = 0; i < numberOfElements; i++) {
            array[i] = in.nextInt();
            sumOfArray += array[i];
        }
        System.out.println(sumOfArray);
        in.close();
    }
}`,
    diffcult: "Easy",
  },
  {
    id: 4,
    problemName: "Palindrome Number",
    statement:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    testCases: [
      { testId: 1, input: "121", output: true },
      { testId: 2, input: "-121", output: false },
      { testId: 3, input: "10", output: false },
      { testId: 4, input: "12321", output: true },
      { testId: 5, input: "222", output: true },
    ],
    inputFormat:
      "The first line contains an integer, n , denoting the size of the array. The second line contains n space-separated integers representing the array's elements.",
    outputFormat: "Print the sum of the array's elements as a single integer.",
    cppAnswer: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    if (x < 0) {
        return false;
    }

    long long reversed = 0;
    int temp = x;

    while (temp != 0) {
        int digit = temp % 10;
        reversed = reversed * 10 + digit;
        temp /= 10;
    }

    return (reversed == x);
  }

  int main() {
    int number;
    cin >> number;

    bool result = isPalindrome(number);
    cout << std::boolalpha << result << endl;

    return 0;
}
`,
    javaAnswer: null,
    diffcult: "Medium",
  },
  {
    id: 5,
    problemName: "Divisible Sum Pairs",
    statement:
      "Given an array of integers and a positive integer k, determine the number of (i,j) pairs where i < j and ar[i] + ar[i+j] is divisible by k.",
    testCases: [
      { testId: 1, input: "6 3 1 3 2 6 1 2", output: 5 },
      { testId: 2, input: "4 4 1 2 1 2", output: 4 },
      { testId: 3, input: "4 5 2 2 3 1", output: 2 },
      { testId: 4, input: "5 6 4 5 6 2 1", output: 5 },
      { testId: 5, input: "7 5 4 5 3 2 4 1", output: 3 },
    ],
    inputFormat:
      "The first line contains 2 space-separated integers, n and k.The second line contains n space-separated integers, each a value of ar[i].",
    outputFormat: "the number of pairs.",
    cppAnswer: `#include <bits/stdc++.h>
using namespace std;

int n, k;
int a[100];

int main() {
	cin >> n >> k;
	for(int i = 0; i < n; i++) cin >> a[i];
    
	int res = 0;
	for(int i = 0; i < n; i++) 
		for(int j = i + 1; j < n; j++) 
			if((a[i] + a[j]) % k == 0) res++;
	cout << res << endl;
	return 0;
}`,
    javaAnswer: null,
    diffcult: "Easy",
  },
  {
    id: 6,
    problemName: "Addition of Numbers ",
    statement: "Write a function to add two numbers.",
    testCases: [
      { testId: 1, input: "6 3 1 2 3 4 5 6", output: 21 },
      { testId: 2, input: "4 4 5 3 2 4", output: 14 },
      { testId: 3, input: "4 4 5 3 1 2", output: 14 },
      { testId: 4, input: "5 4 5 6 2 1 2", output: 18 },
      { testId: 5, input: "6 4 5 3 2 4 1 7", output: 4 },
    ],
    inputFormat:
      "The first line contains an integer, n , denoting the size of the array. The second line contains n space-separated integers representing the array's elements.",
    outputFormat: "Print the sum of the array's elements as a single integer.",
    cppAnswer: `#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
     return a+b; 
  
}

int main() {
    int num1, num2;
    int sum;
    cin>>num1>>num2;
    sum = solveMeFirst(num1,num2);
    cout<<sum;
    return 0;
}`,
    javaAnswer: `import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {


    static int solveMeFirst(int a, int b) {
       return a+b; 

   }

 public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int a;
        a = in.nextInt();
        int b;
        b = in.nextInt();
        int sum;
        sum = solveMeFirst(a, b);
        System.out.println(sum);
   }
}
`,
    diffcult: "Easy",
  },
  {
    id: 7,
    problemName: "The Hurdle Race",
    statement:
      "A video player plays a game in which the character competes in a hurdle race. Hurdles are of varying heights, and the characters have a maximum height they can jump. There is a magic potion they can take that will increase their maximum jump height by 1 unit for each dose. How many doses of the potion must the character take to be able to jump all of the hurdles. If the character can already clear all of the hurdles, return 0.",
    testCases: [
      { testId: 1, input: "5 4 1 6 3 5 2", output: 2 },
      { testId: 2, input: "5 7 2 5 4 5 2", output: 1 },
      { testId: 3, input: "4 4 4 5 3 1", output: 3 },
      { testId: 4, input: "5 4 5 6 2 1 2", output: 2 },
      { testId: 5, input: "7 4 5 3 2 4 1 3", output: 2 },
    ],
    inputFormat:
      "The first line contains two space-separated integers n and k, the number of hurdles and the maximum height the character can jump naturally. The second line contains n space-separated integers height[i] where 0 < i < n.",
    outputFormat: "The minimum number of doses required, always 0 or more",
    javaAnswer: null,
    cppAnswer: `#include <bits/stdc++.h>
  using namespace std;


int main() {
	int n, k;
	cin >> n >> k;
    assert(n > 0 && n <= 100);
    assert(k > 0 && k <= 100);
	int mx = 0;
	while(n -- ){
		int x; cin >> x;
        assert(x > 0 && x <= 100);
		mx = max(mx, x);	
	}
	cout << max(0, mx - k) << "\n";
	return 0;
}`,
    diffcult: "Easy",
  },
  {
    id: 8,
    problemName: "solve Me First",
    statement:
      "Complete the function solveMeFirst to compute the sum of two integers.",
    testCases: [
      { testId: 1, input: "4 5", output: 9 },
      { testId: 2, input: "7 2", output: 9 },
      { testId: 3, input: "4 6", output: 10 },
      { testId: 4, input: "6 2", output: 8 },
      { testId: 5, input: "4 5 ", output: 9 },
      // Add more test cases
    ],
    inputFormat: "Take 2 integers",
    outputFormat: "the sum of a and b",
    cppAnswer: `#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
     return a+b; 
  
}

int main() {
    int num1, num2;
    int sum;
    cin>>num1>>num2;
    sum = solveMeFirst(num1,num2);
    cout<<sum;
    return 0;
}`,
    javaAnswer: `import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {


    static int solveMeFirst(int a, int b) {
       return a+b; 

   }

 public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int a;
        a = in.nextInt();
        int b;
        b = in.nextInt();
        int sum;
        sum = solveMeFirst(a, b);
        System.out.println(sum);
   }
}
`,
    diffcult: "Easy",
  },
  {
    id: 9,
    problemName: "Birthday Cake Candles",
    statement:
      "You are in charge of the cake for a child's birthday. You have decided the cake will have one candle for each year of their total age. They will only be able to blow out the tallest of the candles. Count how many candles are tallest.",
    testCases: [
      { testId: 1, input: "4 3 2 1 3", output: 2 },
      { testId: 2, input: "5 3 2 1 3 6", output: 1 },
      { testId: 3, input: "3 1 3 6", output: 1 },
      { testId: 4, input: "6 6 4 3 1 3 6", output: 2 },
      { testId: 5, input: "5 6 4 3 1 3", output: 1 },
    ],
    inputFormat:
      "The first line contains a single integer, n, the size of candles[].The second line contains n space-separated integers, where each integer i describes the height of .",
    outputFormat: "the number of candles that are tallest",
    cppAnswer: null,
    javaAnswer: `import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // the number of candles
        int n = scan.nextInt();
        
        // store the current maximum height of any candle, initialize to the minimum possible height of any candle
        int maxHeight = 1; 
        
        // count the number of candles having the maximum height
        int countMax = 0;
        
        for(int i = 0; i < n; i++) {
            int tmp = scan.nextInt();
            
            // if you read in a value larger than maxHeight, set new maxHeight
            if(tmp > maxHeight) {
                maxHeight = tmp;
                countMax = 1;
            }
            // if you read a value equal to the current value of maxHeight
            else if(tmp == maxHeight) {
                // increment the count of candles having maximum height
                countMax++;
            }
        }
        scan.close();
        
        System.out.println(countMax);
    }
}
`,
    diffcult: "Medium",
  },
  {
    id: 10,
    problemName: "Sum of 2 Numbers",
    statement: "Write a function to add two numbers.",
    testCases: [
      { testId: 1, input: "6 1 2 3 4 5 6", output: 21 },
      { testId: 2, input: "4 4 5 3 2", output: 14 },
      { testId: 3, input: "4 4 5 3 1", output: 14 },
      { testId: 4, input: "5 4 5 6 2 1", output: 18 },
      { testId: 5, input: "7 4 5 3 2 4 1", output: 19 },
    ],
    inputFormat:
      "The first line contains an integer, n , denoting the size of the array. The second line contains n space-separated integers representing the array's elements.",
    outputFormat: "Print the sum of the array's elements as a single integer.",
    cppAnswer: `#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
     return a+b; 
  
}

int main() {
    int num1, num2;
    int sum;
    cin>>num1>>num2;
    sum = solveMeFirst(num1,num2);
    cout<<sum;
    return 0;
}`,
    javaAnswer: `import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {


    static int solveMeFirst(int a, int b) {
       return a+b; 

   }

 public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int a;
        a = in.nextInt();
        int b;
        b = in.nextInt();
        int sum;
        sum = solveMeFirst(a, b);
        System.out.println(sum);
   }
}
`,
    diffcult: "Easy",
  },
];
