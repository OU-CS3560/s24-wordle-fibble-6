#include <string>
#include <iostream>
#include <fstream>

using namespace std;

//case number 2 needs to make sure it has no decimals

bool is_positive(int num) {
    if(num > 0) {
        return true;
    } else {
        return false;
    }
}

bool is_positive(double num) {
    if(num > 0) {
        return true;
    } else {
        return false;
    }
}

bool no_decimal(double num) {
    int num2 = num;
    if(num2 == num) {
        return true;
    } else {
        return false;
    }
}

//for integers -> if no division possible
int calculator_by_op(int num1, int num2, string op) {
    int ret = 0;
    if(op == "+"){
        ret = num1 + num2;
    } else if(op == "-") {
        ret = num1 - num2;
    } else if(op == "*") {
        ret = num1 * num2;
    } else if(op == "/") {
        ret = num1 / num2;
    }
    return ret;
}

//for doubles -> if division is possible
double calculator_by_op_double(double num1, double num2, string op) {
    double ret = 0.00;
    if(op == "+"){
        ret = num1 + num2;
    } else if(op == "-") {
        ret = num1 - num2;
    } else if(op == "*") {
        ret = num1 * num2;
    } else if(op == "/") {
        ret = num1 / num2;
    }
    return ret;
}

//int random = rand() % 10;
//int num = stoi(str);
int solver(string ret, int equation_case) {
    int default_return = 0;
    string operator1 = "";
    //equation 1
    if (equation_case == 1) {
        int num1 = stoi(ret.substr(0,2));
        int num2 = stoi(ret.substr(3,4));
        operator1 = ret.at(2);
        int solved = calculator_by_op(num1, num2, operator1);
        return solved;
    //equation 2
    } else if (equation_case == 2) {
        int num1 = stoi(ret.substr(0,3));
        int num2 = stoi(ret.substr(4,5));
        operator1 = ret.at(3);
        int solved = calculator_by_op(num1, num2, operator1);
        return solved;
    } else if (equation_case == 4) {
        int num1 = stoi(ret.substr(0,2));
        int num2 = stoi(ret.substr(3,4));
        operator1 = ret.at(2);
        int solved = calculator_by_op(num1, num2, operator1);
        return solved;
    } else if (equation_case == 5) {
        int num1 = stoi(ret.substr(0,1));
        int num2 = stoi(ret.substr(2,4));
        operator1 = ret.at(1);
        int solved = calculator_by_op(num1, num2, operator1);
        return solved;
    }

    return default_return;
}   

//solver -> for doubles [if need for division]
double solver_double(string ret, int equation_case) {
    double default_return = 0.00;
    string operator1 = "";
    string operator2 = "";
    //equation 2
    if (equation_case == 2) {
        double num1 = stod(ret.substr(0,3));
        double num2 = stod(ret.substr(4,5));
        operator1 = ret.at(3);
        double solved = calculator_by_op_double(num1, num2, operator1);
        return solved;
    } else if(equation_case == 3) {
        double num1 = stod(ret.substr(0,1));
        double num2 = stod(ret.substr(2,3));
        double num3 = stod(ret.substr(4,5));
        operator1 = ret.at(1);
        operator2 = ret.at(3);
        double solved = calculator_by_op_double(num1, num2, operator1);
        solved = calculator_by_op_double(solved, num3, operator2);
        return solved;
    } else if(equation_case == 6) {
        double num1 = stod(ret.substr(0,2));
        double num2 = stod(ret.substr(3,4));
        double num3 = stod(ret.substr(5,6));
        operator1 = ret.at(2);
        operator2 = ret.at(4);
        double solved = calculator_by_op_double(num1, num2, operator1);
        solved = calculator_by_op_double(solved, num3, operator2);
        return solved;
    }

    return default_return;
}

int random_number(int min, int how_many) {
    int random = min + rand() % how_many;
    return random;
}

string pick_random_op() {
    int random = 0;
    random = random_number(1, 4);
    string ret = "";
    if(random == 1) {
        ret = "+";
    } else if(random == 2) {
        ret = "-";
    } else if(random == 3) {
        ret = "/";
    } else {
        ret = "*";
    } 
    return ret;
}

string generate_1() {
    string ret = "";
    ret += to_string(random_number(1, 9));
    ret += to_string(random_number(0, 10));
    int random = random_number(1, 2);
    if(random == 1) {
        ret += "-";
    } else {
        ret += "+";
    }
    ret += to_string(random_number(1, 9));
    ret += to_string(random_number(0, 10));
    return ret;
}

string generate_2() {
    string ret = "";
    int random = random_number(1,2);
    if(random == 1) {
        ret += "1";
        ret += to_string(random_number(0,10));
        ret += to_string(random_number(0,10));
        ret += "-";
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
    } else {
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
        ret += to_string(random_number(0,10));
        ret += "/";
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
    }
    return ret;
}

string generate_3() {
    string ret = "";
    string ops[2];
    ops[0] = pick_random_op();
    ops[1] = pick_random_op();
    bool has_mult = false, has_div = false, has_add = false, has_sub = false;
    for (int x = 0; x < 2; x++) {
        if (ops[x] == "*") {
            has_mult = true;
        } else if (ops[x] == "/") {
            has_div = true;
        } else if (ops[x] == "+") {
            has_add = true;
        } else if (ops[x] == "-") {
            has_sub = true;
        }
    }
    if(has_mult && has_div) {
        int random = random_number(1,2);
        if (random == 1) {
            ret += to_string(random_number(1,9));
            ret += "*";
            ret += to_string(random_number(1,9));
            ret += "/";
            ret += to_string(random_number(1,9));
        } else {
            ret += to_string(random_number(1,9));
            ret += "/";
            ret += to_string(random_number(1,9));
            ret += "*";
            ret += to_string(random_number(1,9));
        }
    } else if(has_mult == true && has_add == true) {
        ret += to_string(random_number(1,9));
        ret += "*";
        ret += to_string(random_number(1,9));
        ret += "+";
        ret += to_string(random_number(1,9));
    } else if(has_mult == true && has_sub == true) {
        ret += to_string(random_number(1,9));
        ret += "*";
        ret += to_string(random_number(1,9));
        ret += "-";
        ret += to_string(random_number(1,9));
    } else if(has_div == true && has_add == true) {
        ret += to_string(random_number(1,9));
        ret += "/";
        ret += to_string(random_number(1,9));
        ret += "+";
        ret += to_string(random_number(1,9));
    } else if(has_div == true && has_sub == true) {
        ret += to_string(random_number(1,9));
        ret += "/";
        ret += to_string(random_number(1,9));
        ret += "-";
        ret += to_string(random_number(1,9));
    } else {
        ret += to_string(random_number(1,9));
        ret += ops[0];
        ret += to_string(random_number(1,9));
        ret += ops[1];
        ret += to_string(random_number(1,9));
    }
    return ret;
}

string generate_4() {
    string ret = "";
    ret += to_string(random_number(1,9));
    ret += to_string(random_number(0,10));
    int random = random_number(1, 2);
    if(random == 1) {
        ret += "*";
    } else {
        ret += "+";
    }
    ret += to_string(random_number(1,9));
    return ret;
}

string generate_5() {
    string ret = "";
    ret += to_string(random_number(1,9));
    int random = random_number(1, 2);
    if(random == 1) {
        ret += "-";
    } else {
        ret += "+";
    }
    ret += to_string(random_number(1,9));
    ret += to_string(random_number(0,10));
    return ret;
}

string generate_6() {
    string ret = "";
    string ops[2];
    ops[0] = pick_random_op();
    ops[1] = pick_random_op();
    bool has_mult = false, has_div = false, has_add = false, has_sub = false;
    for (int x = 0; x < 2; x++) {
        if (ops[x] == "*") {
            has_mult = true;
        } else if (ops[x] == "/") {
            has_div = true;
        } else if (ops[x] == "+") {
            has_add = true;
        } else if (ops[x] == "-") {
            has_sub = true;
        }
    }
    if(has_mult && has_div) {
        int random = random_number(1,2);
        if (random == 1) {
            ret += to_string(random_number(1,9));
            ret += to_string(random_number(0,10));
            ret += "*";
            ret += to_string(random_number(1,9));
            ret += "/";
            ret += to_string(random_number(1,9));
        } else {
            ret += to_string(random_number(1,9));
            ret += to_string(random_number(0,10));
            ret += "/";
            ret += to_string(random_number(1,9));
            ret += "*";
            ret += to_string(random_number(1,9));
        }
    } else if(has_mult == true && has_add == true) {
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
        ret += "*";
        ret += to_string(random_number(1,9));
        ret += "+";
        ret += to_string(random_number(1,9));
    } else if(has_mult == true && has_sub == true) {
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
        ret += "*";
        ret += to_string(random_number(1,9));
        ret += "-";
        ret += to_string(random_number(1,9));
    } else if(has_div == true && has_add == true) {
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
        ret += "/";
        ret += to_string(random_number(1,9));
        ret += "+";
        ret += to_string(random_number(1,9));
    } else if(has_div == true && has_sub == true) {
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
        ret += "/";
        ret += to_string(random_number(1,9));
        ret += "-";
        ret += to_string(random_number(1,9));
    } else {
        ret += to_string(random_number(1,9));
        ret += to_string(random_number(0,10));
        ret += ops[0];
        ret += to_string(random_number(1,9));
        ret += ops[1];
        ret += to_string(random_number(1,9));
    }
    return ret;
}

string generate_equation() {
    string default_return = "";
    //not implemented random part here ->
    //currently used to test cases
    int case_num = random_number(1,5);
    int check = 0;
    
    //for case 1
    if(case_num == 1) {
        while(check == 0) {
            string equation = "";
            equation = generate_1();
            int equals = solver(equation, 1);
            if(is_positive(equals) && equals >= 10 && equals <= 99) { 
                equation = equation + "=" + to_string(equals);
                return equation;
            }
        }
    //for case 2
    } else if (case_num == 2) {
        while(check == 0) {
            string equation = "";
            equation = generate_2();
            string operator_check = "";
            operator_check = equation.at(3);
            if (operator_check == "/") {
                double equals = solver_double(equation, 2);
                if(equals >= 1 && equals <= 9 && no_decimal(equals) == true) {
                    equation = equation + "=" + to_string(static_cast<int>(equals));
                    return equation;
                }
            } else if (operator_check == "-"){
                int equals = solver(equation, 2);
                if(equals >= 1 && equals <= 9) {
                    equation = equation + "=" + to_string(equals); 
                    return equation;
                }
            }
            
        }
    //for case 3
    } else if (case_num == 3) {
        while(check == 0) {
            string equation = "";
            equation = generate_3();
            double equals = solver_double(equation, 3);
            if(no_decimal(equals) == true && equals >= 10 && equals <= 99 && is_positive(equals)) {
                equation = equation + "=" + to_string(static_cast<int>(equals));
                return equation; 
            }
        }
    //for case 4
    } else if (case_num == 4) {
        while(check == 0) {
            string equation = "";
            equation = generate_4();
            int equals = solver(equation, 4);
            if(equals >= 100 && equals <= 999) {
                equation = equation + "=" + to_string(equals);
                return equation;
            }
        }
    //for case 5
    } else if (case_num == 5) {
        while(check == 0) {
            string equation = "";
            equation = generate_5();
            int equals = solver(equation, 5);
            if(equals >= 100 && equals <= 999) {
                equation = equation + "=" + to_string(equals);
                return equation;
            }
        }
    //for case 6
    } else if (case_num == 6) {
        while(check == 0) {
            string equation = "";
            equation = generate_6();
            int equals = solver_double(equation, 6);
            if(equals >= 0 && equals <= 9 && is_positive(equals) == true && no_decimal(equals) == true) {
                equation = equation + "=" + to_string(equals);
                return equation;
            }
        }
    }

    return default_return;
}

int main() {
    ofstream outfile("equations_5000.txt");
    if(outfile.is_open()) {
        for(int x = 0; x < 5000; x++) {
            outfile << generate_equation() << endl;
        }
    }

    return 0;
};

