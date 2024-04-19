
exports.calculateNewSalary = async (req, res) => {
    try {
    let {currentSalary,hikePercentage}=req.body;
    const hikeDecimal = hikePercentage / 100;// Convert hike percentage to decimal
    const hikeAmount = currentSalary * hikeDecimal;// Calculate the hike amount
    const newSalary = currentSalary + hikeAmount;// Calculate the new salary

    res.status(200).json(newSalary);
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.calculateHikePercentage = async (req, res) => {
    try {
    let {currentSalary,newSalary}=req.body;
    const hikeAmount = newSalary - currentSalary;   // Calculate the hike amount
    const hikePercentage = (hikeAmount / currentSalary) * 100;// Calculate the percentage hike
    res.status(200).json(hikePercentage.toFixed(2));
    } catch (error) {
        console.error("Error :", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
