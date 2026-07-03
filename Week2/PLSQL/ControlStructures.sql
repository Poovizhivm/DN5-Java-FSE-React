SET SERVEROUTPUT ON;

DECLARE
    salary NUMBER := 60000;
BEGIN

    IF salary >= 50000 THEN
        DBMS_OUTPUT.PUT_LINE('High Salary');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Low Salary');
    END IF;

    DBMS_OUTPUT.PUT_LINE('----------------');

    FOR i IN 1..5 LOOP
        DBMS_OUTPUT.PUT_LINE('Value = ' || i);
    END LOOP;

END;
/