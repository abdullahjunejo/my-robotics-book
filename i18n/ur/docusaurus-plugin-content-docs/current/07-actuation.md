---
sidebar_position: 7
id: robotic-actuation
slug: /robotic-actuation
title: "⚙️ 7. ایکچوایٹرز اور ٹارک کنٹرول"
---

import AIActions from '@site/src/components/AIActions';

<AIActions chapterTitle="Actuators & Torque Control" />

# نیورل ڈائنامکس کا تعارف (Introduction)

# روبوٹ ایکچوایشن (Robot Actuation)

ایکچوایٹرز (Actuators) روبوٹ کے "عضلات" (Muscles) ہوتے ہیں جو جوڑوں کو حرکت دیتے ہیں $180°C$۔

* **ہائی ٹارک موٹرز (High Torque Motors):** بھاری وزن اٹھانے کے لیے طاقتور موٹرز کا استعمال۔
* **جوڑوں کی درستگی (Joint Precision):** روبوٹ کے ہاتھوں اور پیروں کو باریکی سے کنٹرول کرنا۔
* **فیڈ بیک لوپس (Feedback Loops):** موٹر کی پوزیشن کو ہر ملی سیکنڈ میں چیک کرنا۔

# کوڈ کو جسمانی طاقت میں تبدیل کرنا

ایکچوایٹرز فزیکل اے آئی سسٹم کے "پٹھے" یا عضلات ہیں۔ اعلیٰ درستگی والے ٹارک کنٹرول کے بغیر، روبوٹ نہ تو توازن برقرار رکھ سکتا ہے اور نہ ہی اشیاء کو صحیح طرح پکڑ سکتا ہے۔

## 7.1 صنعتی درجے کی موٹرز (Industrial Grade Motors)
جدید ہیومنائیڈ روبوٹس اپنی طاقت کے لیے **برش لیس ڈی سی (BLDC)** موٹرز استعمال کرتے ہیں۔
* **ہارمونک ڈرائیوز (Harmonic Drives):** وہ گیئرز جو بغیر کسی جھٹکے کے ہموار حرکت کی اجازت دیتے ہیں۔
* **اسٹرین گیجز (Strain Gauges):** وہ سینسر جو یہ ناپتے ہیں کہ جوڑ پر کتنی "طاقت" لگائی جا رہی ہے۔

## 7.2 ٹارک پر مبنی کنٹرول لاجک
فزیکل اے آئی میں، ہم صرف ٹانگ کی *پوزیشن* کو کنٹرول نہیں کرتے، بلکہ اس کی *سختی* (Stiffness) کو بھی کنٹرول کرتے ہیں۔ اسے **امپیڈنس کنٹرول** (Impedance Control) کہا جاتا ہے۔ یہ روبوٹ کو انسان کو چھوتے وقت "نرم" اور بھاری باکس اٹھاتے وقت "سخت" ہونے کی اجازت دیتا ہے۔

## 7.3 کوڈ: موٹر کے استحکام کے لیے PID لوپ
```python
class MotorController:
    def __init__(self, kp, ki, kd):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.prev_error = 0
        self.integral = 0

    def calculate_torque(self, target_pos, current_pos, dt=0.01):
        # ہدف اور موجودہ پوزیشن کے فرق کا حساب
        error = target_pos - current_pos
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt
        
        # ٹارک کا حساب (PID فارمولا)
        torque = (self.kp * error) + (self.ki * self.integral) + (self.kd * derivative)
        self.prev_error = error
        return max(-10.0, min(10.0, torque)) # ٹارک کو 10Nm پر محدود کرنا

joint = MotorController(15.0, 0.1, 0.5)
print(f"حساب شدہ ٹارک (Computed Torque): {joint.calculate_torque(90.0, 85.0)} Nm")