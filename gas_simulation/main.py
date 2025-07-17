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
        self.total_delta_v: float = 0
    
    def update(self, length: float, step_duration: float):
        self.x += self.vx * step_duration
        self.y += self.vy * step_duration
        self.z += self.vz * step_duration
        if self.x <= 0 or self.x >= length:
            self.vx *= -1
            self.num_collisions += 1
            self.total_delta_v += abs(2*self.vx)
        if self.y <= 0 or self.y >= length:
            self.vy *= -1
            self.num_collisions += 1
            self.total_delta_v += abs(2*self.vy)
        if self.z <= 0 or self.z >= length:
            self.vz *= -1
            self.num_collisions += 1
            self.total_delta_v += abs(2*self.vz)

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
        return self.calc_heat() / num_mols / BOLTZMANN # kelvin
    
    def calc_avg_acceleration(self) -> float:
        """The average acceleration that a single molecule feels."""
        total_delta_v = sum(mol.total_delta_v for mol in self.mols) # meters per second
        return total_delta_v / num_mols / simulation_duration # meters per second^2
    
    def calc_avg_force(self) -> float:
        """The average force that a single molecule feels."""
        return mol_mass * self.calc_avg_acceleration() # Newton
    
    def calc_total_force(self) -> float:
        """The total force applied to the container."""
        return self.calc_avg_force() * num_mols # Newton
    
    def calc_pressure(self) -> float:
        surface_area = length**2 * 6
        return self.calc_total_force() / surface_area # Pascal


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
    temp = main_simulator.calc_temp()
    surface_area = length**2 * 6 # meter^2
    print(f"Molecule count  (n):   {num_mols}")
    print(f"Volume          (V):   {length**3:.3f} meters^3")
    print(f"Temperature     (T):   {temp:.2f} kelvin ({(temp - 273.15):.2f} celsius)")
    print(f"Pressure        (P):   {main_simulator.calc_pressure():.3g} Pascal")

main()