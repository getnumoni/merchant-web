"use client";

import { RewardIcon } from "@/components/common/icon-svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RewardRulesSectionProps } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function RewardRulesSection({
  earnMethod,
  minSpending,
  setMinSpending,
  maxSpending,
  setMaxSpending,
  rewardPercentage,
  setRewardPercentage,
  rewardRules,
  setRewardRules,
  showTable,
  setShowTable
}: RewardRulesSectionProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const handleSaveRule = () => {
    if (minSpending && maxSpending && rewardPercentage) {
      const newRule = {
        min: minSpending,
        max: maxSpending,
        percentage: rewardPercentage
      };

      if (editingIndex !== null) {
        // Update existing rule
        const updatedRules = [...rewardRules];
        updatedRules[editingIndex] = newRule;
        setRewardRules(updatedRules);
        setEditingIndex(null);
      } else {
        // Add new rule
        setRewardRules([...rewardRules, newRule]);
      }

      setMinSpending("");
      setMaxSpending("");
      setRewardPercentage("");
      setShowTable(true);
    }
  };

  const handleEditRule = (index: number) => {
    const rule = rewardRules[index];
    setMinSpending(rule.min);
    setMaxSpending(rule.max);
    setRewardPercentage(rule.percentage);
    setEditingIndex(index);
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rewardRules.filter((_, i) => i !== index);
    setRewardRules(updatedRules);
    if (updatedRules.length === 0) {
      setShowTable(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setMinSpending("");
    setMaxSpending("");
    setRewardPercentage("");
  };

  const isSaveRuleDisabled = !minSpending || !maxSpending || !rewardPercentage;

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-900">
        Reward Rules <span className="text-red-500">*</span>
      </label>

      {/* Rules Table */}
      {showTable && rewardRules.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 text-sm border-b border-gray-200">
            <div className="font-medium text-theme-dark-green px-4 py-3 text-left">Min</div>
            <div className="font-medium text-theme-dark-green px-4 py-3 text-center">Max</div>
            <div className="font-medium text-theme-dark-green px-4 py-3 text-right">Reward {earnMethod === "percentage" ? "%" : ""}</div>
            <div className="font-medium text-theme-dark-green px-4 py-3 text-center">Actions</div>
          </div>
          {rewardRules.map((rule, index) => (
            <div key={index} className={`grid grid-cols-4 text-sm text-gray-900 ${index !== rewardRules.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="px-4 py-3 text-left">{rule.min}</div>
              <div className="px-4 py-3 text-center">{rule.max}</div>
              <div className="px-4 py-3 text-right">
                {rule.percentage}{earnMethod === "percentage" ? "%" : ""}
              </div>
              <div className="px-4 py-3 text-center flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditRule(index)}
                  className="h-8 w-8 p-0 hover:bg-gray-200"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRule(index)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input Fields */}
      <div className="flex items-center gap-2 w-full">
        <Input
          type="number"
          placeholder="Min"
          value={minSpending}
          onChange={(e) => setMinSpending(e.target.value)}
          className="flex-1 min-w-0 px-3 py-6 focus:outline-none focus:ring-0 focus:border-none"
        />
        <span className="text-gray-500 flex-shrink-0">-</span>
        <Input
          type="number"
          placeholder="Max. Spending"
          value={maxSpending}
          onChange={(e) => setMaxSpending(e.target.value)}
          className="flex-1 min-w-0 px-3 py-6 focus:outline-none focus:ring-0 focus:border-none"
        />
        <span className="text-gray-500 flex-shrink-0">=</span>
        <div className="flex-1 min-w-0 relative">
          <Input
            type="number"
            placeholder="0"
            value={rewardPercentage}
            onChange={(e) => setRewardPercentage(e.target.value)}
            className="w-full pl-10 pr-3 py-6 focus:outline-none focus:ring-0 focus:border-none"
          />
          {earnMethod === "percentage" ? (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none bg-theme-gray-700">%</span>
          ) : (
            <RewardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-dark-green pointer-events-none h-4 w-4" />
          )}
        </div>
        <span className="text-gray-500 flex-shrink-0">-</span>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={handleSaveRule}
            disabled={isSaveRuleDisabled}
            className={`px-8 py-6 text-sm ${isSaveRuleDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-theme-dark-green hover:bg-theme-dark-green/90 text-white"
              }`}
          >
            {editingIndex !== null ? "Update" : "Save"}
          </Button>
          {editingIndex !== null && (
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              className="px-6 py-6 text-sm"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
