package Builder;


public class Pizza {
    private final String size;
    private final String crust;

    private final boolean cheese;
    private final boolean pepperoni;
    private final boolean mushrooms;
    private final boolean olives;

    private Pizza(PizzaBuilder builder) {
        this.size = builder.size;
        this.crust = builder.crust;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
        this.olives = builder.olives;
    }

    public String getSize() { return size; }
    public String getCrust() { return crust; }
    public boolean hasCheese() { return cheese; }
    public boolean hasPepperoni() { return pepperoni; }
    public boolean hasMushrooms() { return mushrooms; }
    public boolean hasOlives() { return olives; }

    @Override
    public String toString() {
        return "Pizza [size=" + size + ", crust=" + crust +
               ", cheese=" + cheese + ", pepperoni=" + pepperoni +
               ", mushrooms=" + mushrooms + ", olives=" + olives + "]";
    }

    public static class PizzaBuilder {
        private final String size;
        private final String crust;

        private boolean cheese = false;
        private boolean pepperoni = false;
        private boolean mushrooms = false;
        private boolean olives = false;

        public PizzaBuilder(String size, String crust) {
            this.size = size;
            this.crust = crust;
        }

        public PizzaBuilder addCheese() {
            this.cheese = true;
            return this;
        }

        public PizzaBuilder addPepperoni() {
            this.pepperoni = true;
            return this;
        }

        public PizzaBuilder addMushrooms() {
            this.mushrooms = true;
            return this;
        }

        public PizzaBuilder addOlives() {
            this.olives = true;
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }

    public static void main(String[] args) {
        Pizza myPizza = new Pizza.PizzaBuilder("Large", "Thin Crust")
                .addCheese()
                .addPepperoni()
                .addOlives()
                .build();

        System.out.println(myPizza);
    }
}
