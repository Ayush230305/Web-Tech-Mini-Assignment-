class Employee {
    private int empID;
    private String name;
    private double salary;
    private String designation;
    private String department;
    public Employee() {
    }
    // Getters and Setters
    public int getEmpID() {
        return empID;
    }
    public void setEmpID(int empID) {
        this.empID = empID;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public double getSalary() {
        return salary;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }
    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }
    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
    }
}
public class Employ {
    public static void main(String[] args) {
        Employee e = new Employee();

        e.setEmpID(101);
        e.setName("Ayush Kumar");
        e.setSalary(50000);
        e.setDesignation("Software Developer");
        e.setDepartment("Computer Science Design");

        System.out.println("Employee ID: " + e.getEmpID());
        System.out.println("Name: " + e.getName());
        System.out.println("Salary: " + e.getSalary());
        System.out.println("Designation: " + e.getDesignation());
        System.out.println("Department: " + e.getDepartment());
    }
}