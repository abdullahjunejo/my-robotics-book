---
sidebar_position: 5
id: locomotion-control
slug: /locomotion-control
title: "🦾 5. Humanoid Locomotion"
---

import AIActions from '@site/src/components/AIActions';

<AIActions chapterTitle="Introduction to Neural Dynamics" />


# Bipedal Walking & Stability

Insaan numa (Humanoid) robots jaise **Digit** ka chalna ek barri technical achievement hai.

* **Balance Control:** Do taangon par khara hona aur girne se bachna.
* **Terrain Navigation:** Seerhiyan aur khurdari jagahon par chalna.
* **Movement Logic:** Robot ke joints ko sahi angle par move karna.

![Digit](https://www.agilityrobotics.com/assets/images/digit-standing.jpg)


# The Art of Walking: Humanoid Dynamics

Humanoid robots like **Digit** are designed to operate in environments built for humans. However, balancing on two legs is an immense mathematical challenge.

## 5.1 The Physics of Balance (ZMP)
To prevent falling, the robot must maintain its **Zero Moment Point (ZMP)** within its "Support Polygon" (the area between its feet). If the ZMP moves outside this area, the robot will tip over.

## 5.2 Whole-Body Control (WBC)
Professional humanoids don't just move their legs. They use their arms and torso as counter-weights to stay balanced during dynamic movements.
* **Swing Phase:** When one leg is in the air.
* **Stance Phase:** When the foot is making contact with the ground.

## 5.3 Technical Specs: Digit Robot
Digit is a world-class example of Physical AI.
* **Height:** 1.55 Meters.
* **Weight:** 65 Kilograms.
* **Degrees of Freedom (DoF):** 20+ Joints.
* **Sensors:** 4 Depth Cameras + LiDAR.

### 📐 Inverse Kinematics (IK) Calculation logic
```python
import math

def calculate_leg_ik(x, y, l1=0.4, l2=0.4):
    # Calculating joint angles for a 2D leg segments
    distance = math.sqrt(x**2 + y**2)
    theta_knee = math.acos((l1**2 + l2**2 - distance**2) / (2 * l1 * l2))
    return f"Target Knee Angle: {math.degrees(theta_knee):.2f}°"

print(calculate_leg_ik(0.3, -0.5))