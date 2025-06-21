import random


class Molecule:
    def __init__(self, length: float, vmax: float):
        self.vx = random.random() * 2*vmax - vmax
        self.vy = random.random() * 2*vmax - vmax
        self.vz = random.random() * 2*vmax - vmax
        self.x = random.random() * length
        self.y = random.random() * length
        self.z = random.random() * length
        self.num_collisions: int = 0
    
    def update(self, length: float, step_duration: float):
        self.x += self.vx * step_duration
        self.y += self.vy * step_duration
        self.z += self.vz * step_duration
        if self.x <= 0 or self.x >= length:
            self.vx *= -1
            self.num_collisions += 1
        if self.y <= 0 or self.y >= length:
            self.vy *= -1
            self.num_collisions += 1
        if self.z <= 0 or self.z >= length:
            self.vz *= -1
            self.num_collisions += 1

length = 1 # meters
num_mols = 1000
vmax = 0.1 # meters per second
step_duration = 0.1 # seconds
simulation_duration = 100 # seconds

def main():
    simulator: list[Molecule] = []
    current_time = 0 # seconds since start
    for i in range(num_mols):
        simulator.append(Molecule(length, vmax))
    while current_time < simulation_duration:
        for mol in simulator:
            mol.update(length, step_duration)
        current_time += step_duration
    total_collisions = sum([mol.num_collisions for mol in simulator])
    collisions_per_second = total_collisions / simulation_duration
    print(f"{collisions_per_second:.2f} collisions per second.")

main()