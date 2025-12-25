---
sidebar_position: 7
id: robotic-actuation
slug: /robotic-actuation
title: "⚙️ 7. Actuators & Torque Control"
---

import AIActions from '@site/src/components/AIActions';

<AIActions chapterTitle="Introduction to Neural Dynamics" />


# Robot Actuation

Actuators robot ke "muscles" hote hain jo joints ko harkat dete hain.

* **High Torque Motors:** Bhaari wazan uthane ke liye takatwar motors ka istemal.
* **Joint Precision:** Robot ke hathon aur pairon ko bariki se control karna.
* **Feedback Loops:** Motor ki position ko har millisecond mein check karna.

#  Transforming Code into Physical Force

Actuators are the "muscles" of the Physical AI system. Without high-precision torque control, a robot cannot balance or manipulate objects.

## 7.1 Industrial Grade Motors
Modern humanoids use **Brushless DC (BLDC)** motors for their power density.
* **Harmonic Drives:** Zero-backlash gears that allow for smooth, jitter-free movement.
* **Strain Gauges:** Sensors that measure the exact "force" being applied to a joint.

## 7.2 Torque-Based Control Logic
In Physical AI, we don't just control the *position* of a leg; we control the *stiffness*. This is known as **Impedance Control**. It allows the robot to be "soft" when touching a human and "stiff" when lifting a heavy box.



## 7.3 Code: PID Loop for Motor Stabilization
```python
class MotorController:
    def __init__(self, kp, ki, kd):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.prev_error = 0
        self.integral = 0

    def calculate_torque(self, target_pos, current_pos, dt=0.01):
        error = target_pos - current_pos
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt
        
        torque = (self.kp * error) + (self.ki * self.integral) + (self.kd * derivative)
        self.prev_error = error
        return max(-10.0, min(10.0, torque)) # Clamping torque at 10Nm

joint = MotorController(15.0, 0.1, 0.5)
print(f"Computed Torque: {joint.calculate_torque(90.0, 85.0)} Nm")