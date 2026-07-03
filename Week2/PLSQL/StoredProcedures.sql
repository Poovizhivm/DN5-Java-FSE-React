CREATE OR REPLACE PROCEDURE DisplayEmployeeSalary (
    emp_id IN NUMBER
)
AS
    emp_name Employee.employee_name%TYPE;
    emp_salary Employee.salary%TYPE;
BEGIN

    SELECT employee_name, salary
    INTO emp_name, emp_salary
    FROM Employee
    WHERE employee_id = emp_id;

    DBMS_OUTPUT.PUT_LINE('Employee Name : ' || emp_name);
    DBMS_OUTPUT.PUT_LINE('Salary : ' || emp_salary);

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Employee Not Found');

END;
/