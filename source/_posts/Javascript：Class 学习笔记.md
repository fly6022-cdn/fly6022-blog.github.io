---
title: JavaScript：Class 学习笔记
layout: post
cover: /background/85.jpg
coverWidth: 2550
coverHeight: 1440
categories:
  - 编程开发
tags:
  - JavaScript
date: 2022/8/19 9:54:46
---
JavaScript 语言中的 类（class）概念于 ECMAScript 6 （JavaScript 2015）之后被提出，它使得JavaScript 面向对象的编程思想更为鲜明，能够大大增加开发效率。

本文章介绍一些关于类的基本使用方法。

<!--more-->

## 定义类

在JavaScript中，定义类共有2种主要的方式，第一种为类声明，第二种为类表达式。

1. 类声明

   ```javascript
   class a = {}
   ```
2. 类表达式

   ```javascript
   const a = class {}
   ```

### 提升

与函数（function）不同，类（class）的声明不会提升，因此，应当先声明类，再访问类。

下面是一个**错误示例**：

!!! ERROR

    ```javascript
    const a = new a();

    class a = {}
    ```

而下面的，是一个正确示例：

!!! todo

    ```javascript
    class a = {}

    const a = new a();
    ```

### 作用域

类受块作用域的限制。因此，在class中声明的 ``var``变量是全局变量，声明的 ``let``变量是局部变量，声明的 ``const``常量是局部常量。

> 为了便于维护，建议声明变量尽量用let，避免用var。

## 创建类

创建类的语法格式如下：

```javascript
class className {
	constructor() {
		// 代码块
	}
}
```

## 使用类

下面给出一个实例：

```javascript
class school_student{
	constructor(name, school, birth_year, id) {
        this.student = name; // 姓名
        this.school = school; // 学校
        this.birth_year = birth_year; // 出生年
        this.id = id; // 学号
    }
}

let s_student = new class_1("小明", "xx市xx中学", "2005", "000015");
```

在上面的实例中，我们创建了一个类 ``school_student``，用来表示某市某中学学生信息。

而在使用类时，描述变量通常用 ``this.变量名``的形式。

在将类实例化时，通常使用语句 ``let new_var_Name = new class_Name()``。此处，我们定义一个变量 ``s_student``，将类实例化。

#### 拓展用法

将参数作为对象（Object）引入。

```javascript
class school_student{
	constructor({name, school, birth_year, id}) {
        this.student = name; // 姓名
        this.school = school; // 学校
        this.birth_year = birth_year; // 出生年
        this.id = id; // 学号
    }
}

let s_student = new class_1({
	student = "小明",
	school = "xx市xx中学",
	birth_year = "2005",
	id = "000015"
});
```

### 类的方法

此处依然沿用上方的实例。

```javascript
class school_student{
	constructor(name, school, birth_year, id) {
        this.student = name; // 姓名
        this.school = school; // 学校
        this.birth_year = birth_year; // 出生年
        this.id = id; // 学号
    }
  
    age() {
        let date = new date();
        return date.getFullYear() - this.birth_year;
    }
}

let s_student = new class_1("小明", "xx市xx中学", "2005", "000015");

s_student.age() // 返回该同学的年龄
```

与之前不同的是，我们创建了一个名为 ``age()``的方法。

通过之前定义的变量 ``s_student``，我们便可以访问 ``age()``方法。``s_student.age()``便可以返回该同学的年龄。

事实上，上文中的 ``constructor()``也是一个方法，它是一种特殊的方法，用于创建和初始化在类中创建的对象，被称之为构造函数方法。

### 类的继承

类的继承使用 ``extends``关键字。类的继承可以依据另一个类来定义一个类。一个已有的类称之为基类（父类），已该类为依据新定义的类称之为派生类（子类）。

我们依然沿用上方实例。

```javascript
class school_student{ // 基类
	constructor(name, school, birth_year, id) {
        this.student = name; // 姓名
        this.school = school; // 学校
        this.birth_year = birth_year; // 出生年
        this.id = id; // 学号
    }
  
    age() {
        let date = new date();
        return date.getFullYear() - this.birth_year;
    }
}

let s_student = new class_1("小明", "xx市xx中学", "2005", "000015");

s_student.age() // 返回该同学的年龄

class performance extends school_student{ // 派生类
    constructor(name, school, birth_year, id){
        super(name, school, birth_year, id)
        this.performance = performance;
        this.grade = grade;
    judgement(performance, grade){
        return "姓名：" + this.name + "成绩：" + this.performance + "等级：" + this.grade
    }
    }
}

s_student.performance("90","A") // 实例化（成绩90；等级A）
```
