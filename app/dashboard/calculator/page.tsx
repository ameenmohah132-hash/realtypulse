"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Calculator, Home, TrendingUp, DollarSign, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function CalculatorPage() {
  // Mortgage Calculator State
  const [homePrice, setHomePrice] = useState(2500000)
  const [downPayment, setDownPayment] = useState(500000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)

  // ROI Calculator State
  const [purchasePrice, setPurchasePrice] = useState(1000000)
  const [monthlyRent, setMonthlyRent] = useState(8000)
  const [expenses, setExpenses] = useState(2000)
  const [appreciation, setAppreciation] = useState(3)

  // Commission Calculator State
  const [salePrice, setSalePrice] = useState(3000000)
  const [commissionRate, setCommissionRate] = useState(3)

  // Mortgage Calculations
  const loanAmount = homePrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - loanAmount

  const mortgageData = [
    { name: "Principal", value: loanAmount, color: "oklch(0.75 0.15 180)" },
    { name: "Interest", value: totalInterest, color: "oklch(0.7 0.17 155)" },
    { name: "Down Payment", value: downPayment, color: "oklch(0.6 0.2 250)" },
  ]

  // ROI Calculations
  const annualRent = monthlyRent * 12
  const annualExpenses = expenses * 12
  const netIncome = annualRent - annualExpenses
  const cashROI = (netIncome / purchasePrice) * 100
  const capRate = (netIncome / purchasePrice) * 100
  const yearlyAppreciation = purchasePrice * (appreciation / 100)
  const totalROI = ((netIncome + yearlyAppreciation) / purchasePrice) * 100

  // Commission Calculations
  const totalCommission = salePrice * (commissionRate / 100)
  const agentSplit = totalCommission * 0.7
  const brokerSplit = totalCommission * 0.3

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          Real Estate Calculator
        </h1>
        <p className="text-muted-foreground">
          Financial tools for investment analysis
        </p>
      </div>

      <Tabs defaultValue="mortgage" className="space-y-6">
        <TabsList className="glass-card p-1">
          <TabsTrigger value="mortgage" className="gap-2">
            <Home className="h-4 w-4" />
            Mortgage
          </TabsTrigger>
          <TabsTrigger value="roi" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            ROI
          </TabsTrigger>
          <TabsTrigger value="rental" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Rental Yield
          </TabsTrigger>
          <TabsTrigger value="commission" className="gap-2">
            <Percent className="h-4 w-4" />
            Commission
          </TabsTrigger>
        </TabsList>

        {/* Mortgage Calculator */}
        <TabsContent value="mortgage" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Mortgage Calculator</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Home Price</Label>
                    <span className="text-sm text-primary font-medium">
                      ${homePrice.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[homePrice]}
                    onValueChange={(v) => setHomePrice(v[0])}
                    min={100000}
                    max={10000000}
                    step={50000}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Down Payment</Label>
                    <span className="text-sm text-primary font-medium">
                      ${downPayment.toLocaleString()} ({((downPayment / homePrice) * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <Slider
                    value={[downPayment]}
                    onValueChange={(v) => setDownPayment(v[0])}
                    min={0}
                    max={homePrice}
                    step={10000}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Interest Rate</Label>
                    <span className="text-sm text-primary font-medium">{interestRate}%</span>
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(v) => setInterestRate(v[0])}
                    min={1}
                    max={15}
                    step={0.125}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Loan Term</Label>
                    <span className="text-sm text-primary font-medium">{loanTerm} years</span>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(v) => setLoanTerm(v[0])}
                    min={10}
                    max={30}
                    step={5}
                    className="py-2"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Payment Breakdown</h3>
              
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mortgageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {mortgageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                  <span className="text-sm text-muted-foreground">Monthly Payment</span>
                  <span className="text-2xl font-bold text-primary">
                    ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Loan Amount</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${loanAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Total Interest</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ROI Calculator */}
        <TabsContent value="roi" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">ROI Calculator</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Purchase Price</Label>
                  <Input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Rental Income</Label>
                  <Input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Expenses</Label>
                  <Input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Annual Appreciation</Label>
                    <span className="text-sm text-primary font-medium">{appreciation}%</span>
                  </div>
                  <Slider
                    value={[appreciation]}
                    onValueChange={(v) => setAppreciation(v[0])}
                    min={0}
                    max={10}
                    step={0.5}
                    className="py-2"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Investment Analysis</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Total ROI</p>
                  <p className="text-3xl font-bold text-primary">{totalROI.toFixed(1)}%</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Cap Rate</p>
                  <p className="text-3xl font-bold text-emerald-500">{capRate.toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Annual Rental Income</span>
                  <span className="font-medium text-foreground">${annualRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Annual Expenses</span>
                  <span className="font-medium text-foreground">-${annualExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Net Operating Income</span>
                  <span className="font-medium text-emerald-500">${netIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Yearly Appreciation</span>
                  <span className="font-medium text-primary">${yearlyAppreciation.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Rental Yield Calculator */}
        <TabsContent value="rental" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Rental Yield Calculator</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Property Value</Label>
                  <Input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Rent</Label>
                  <Input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Operating Costs</Label>
                  <Input
                    type="number"
                    value={annualExpenses}
                    onChange={(e) => setExpenses(Number(e.target.value) / 12)}
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Yield Analysis</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Gross Yield</p>
                  <p className="text-3xl font-bold text-primary">
                    {((annualRent / purchasePrice) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Net Yield</p>
                  <p className="text-3xl font-bold text-emerald-500">
                    {((netIncome / purchasePrice) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Annual Rental Income</span>
                  <span className="font-medium text-foreground">${annualRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Operating Costs</span>
                  <span className="font-medium text-red-500">-${annualExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-sm font-medium text-foreground">Net Annual Income</span>
                  <span className="font-bold text-emerald-500">${netIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Commission Calculator */}
        <TabsContent value="commission" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Commission Calculator</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Sale Price</Label>
                    <span className="text-sm text-primary font-medium">
                      ${salePrice.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[salePrice]}
                    onValueChange={(v) => setSalePrice(v[0])}
                    min={100000}
                    max={20000000}
                    step={100000}
                    className="py-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Commission Rate</Label>
                    <span className="text-sm text-primary font-medium">{commissionRate}%</span>
                  </div>
                  <Slider
                    value={[commissionRate]}
                    onValueChange={(v) => setCommissionRate(v[0])}
                    min={1}
                    max={6}
                    step={0.25}
                    className="py-2"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Commission Breakdown</h3>
              
              <div className="p-4 rounded-xl bg-primary/10 text-center mb-4">
                <p className="text-xs text-muted-foreground mb-1">Total Commission</p>
                <p className="text-4xl font-bold text-primary">
                  ${totalCommission.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-sm font-medium text-foreground">Agent Split (70%)</span>
                  <span className="font-bold text-emerald-500">${agentSplit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Broker Split (30%)</span>
                  <span className="font-medium text-foreground">${brokerSplit.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Calculator className="h-4 w-4 mr-2" />
                Generate Commission Report
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
