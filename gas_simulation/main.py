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

    def calc_kinetic_energy(self) -> float:
        vsquared = self.vx**2 + self.vy**2 + self.vz**2
        return (mol_mass * vsquared) / 2 # joules

class Simulator:
    def __init__(self):
        self.mols: list[Molecule] = []
    
    def calc_collisions_per_sec(self) -> float:
        total_collisions = sum([mol.num_collisions for mol in self.mols])
        return total_collisions / simulation_duration
    
    def calc_heat(self) -> float:
        return sum([mol.calc_kinetic_energy() for mol in self.mols]) # joules
    
    def calc_temp(self) -> float:
        return self.calc_heat() / len(self.mols) / BOLTZMANN # kelvin


length = 1 # meters
num_mols = 1000
vmax = 419 # meters per second
mol_mass = 2.3259e-26 * 2 # kilograms - weight of nitrogen mol
BOLTZMANN = 1.380649e-23 # joules / kelvin

step_duration = 0.1 # seconds
simulation_duration = 100 # seconds

def main():
    main_simulator = Simulator()
    current_time = 0 # seconds since start
    for i in range(num_mols):
        main_simulator.mols.append(Molecule(length, vmax))
    while current_time < simulation_duration:
        for mol in main_simulator.mols:
            mol.update(length, step_duration)
        current_time += step_duration
    print(f"{main_simulator.calc_collisions_per_sec():.2f} collisions per second.")
    print(f"Heat: {main_simulator.calc_heat():.3g} joules.")
    temp = main_simulator.calc_temp()
    print(f"Temperature: {temp:.2f} kelvin ({(temp - 273.15):.2f} celsius).")

main()