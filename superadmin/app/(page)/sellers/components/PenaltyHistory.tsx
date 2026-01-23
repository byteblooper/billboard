'use client';

import { Penalty, PenaltyType } from './types';

interface PenaltyHistoryProps {
  penalties: Penalty[];
  onRemovePenalty: (penaltyId: string) => void;
}

const penaltyTypeConfig: Record<PenaltyType, { label: string; icon: string; bgColor: string; textColor: string }> = {
  warning: {
    label: 'Warning',
    icon: '⚠️',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
  },
  fine: {
    label: 'Fine',
    icon: '💰',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
  temporary_ban: {
    label: 'Temporary Ban',
    icon: '⏸️',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
  },
  permanent_ban: {
    label: 'Permanent Ban',
    icon: '🚫',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
};

export default function PenaltyHistory({ penalties, onRemovePenalty }: PenaltyHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const activePenalties = penalties.filter((p) => p.isActive);
  const inactivePenalties = penalties.filter((p) => !p.isActive);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Penalty History ({penalties.length})
      </h3>

      {penalties.length === 0 ? (
        <div className="text-center py-8 bg-green-50 rounded-lg">
          <svg
            className="w-12 h-12 mx-auto text-green-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-green-700 font-medium">No penalties on record</p>
          <p className="text-sm text-green-600">This seller has a clean record</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Penalties */}
          {activePenalties.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Active Penalties ({activePenalties.length})
              </h4>
              <div className="space-y-2">
                {activePenalties.map((penalty) => {
                  const config = penaltyTypeConfig[penalty.type];
                  return (
                    <div
                      key={penalty.id}
                      className={`p-4 rounded-lg border-2 border-red-200 ${config.bgColor}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{config.icon}</span>
                          <div>
                            <p className={`font-medium ${config.textColor}`}>{config.label}</p>
                            <p className="text-sm text-gray-600 mt-1">{penalty.reason}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>Started: {formatDate(penalty.startDate)}</span>
                              {penalty.endDate && <span>Ends: {formatDate(penalty.endDate)}</span>}
                              {penalty.amount && (
                                <span className="font-medium text-orange-600">
                                  Fine: {formatCurrency(penalty.amount)}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mt-1">By: {penalty.createdBy}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemovePenalty(penalty.id)}
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past Penalties */}
          {inactivePenalties.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Past Penalties ({inactivePenalties.length})
              </h4>
              <div className="space-y-2">
                {inactivePenalties.map((penalty) => {
                  const config = penaltyTypeConfig[penalty.type];
                  return (
                    <div
                      key={penalty.id}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-200 opacity-75"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{config.icon}</span>
                        <div>
                          <p className="font-medium text-gray-600">{config.label}</p>
                          <p className="text-sm text-gray-500 mt-1">{penalty.reason}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span>Started: {formatDate(penalty.startDate)}</span>
                            {penalty.endDate && <span>Ended: {formatDate(penalty.endDate)}</span>}
                            {penalty.amount && (
                              <span>Fine: {formatCurrency(penalty.amount)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
