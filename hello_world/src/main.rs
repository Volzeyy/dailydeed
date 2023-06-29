use rand::prelude::*;

fn main() {
    let mut rng = rand::thread_rng();
    let coin_flip: f64 = rng.gen();

    if coin_flip < 0.5 {
        std::println!("Tails");
        return;
    }

    if coin_flip > 0.5 {
        std::println!("Heads");
        return;
    };

    std::println!("The coin blew up D:");
}
