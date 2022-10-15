# CSTrackOptimizer

## Problem
At Purdue University, there are a a lot of tracks that students can accomplish in the Computer Science Program. While many students only end up completing one track, others decide to complete 2 or more tracks. To do so involves a significant amount of thought into what courses should be taken to complete the selected tracks. Let's consider the following example: Machine Learning/Intelligence and Software. Even though either Compilers or Operating Systems can be used for Software, Compilers should be chosen because it can intersect with Machine Learning/Intelligence as an elective. This kind of thinking is not very straightforward and gets more abstract as more tracks are selected.

## Solution
To rectify this problem and make the Computer Science Track proccess at Purdue easier, I developed an algorithm that can find the minimum number of courses required to complete any number of tracks. Also, it allows for some modularity by allowing the user to select courses that they wish to take or have already taken. This feature allows students who wish to pivot from one track to another an easier time with selecting the right courses given their already selected ones.

## Course Priorities
The course selection algorithm takes the following into consideration when courses are being recommended.
1. Smallest number of courses
2. Course Availability (How often the course shows up in rotation)
3. Course number (300s have higher priority than 400s)

## How to use algorithm/program
This program is being hosted using Github pages and can be found using the following link: https://athata1.github.io/CSTrackOptimizer/
