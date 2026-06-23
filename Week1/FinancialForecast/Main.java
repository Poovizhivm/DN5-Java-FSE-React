public class Main {

    public static void main(String[] args) {

        double result =
                FinancialForecast.forecast(
                        10000,
                        0.10,
                        3
                );

        System.out.println(
                "Future Value = " + result
        );
    }
}